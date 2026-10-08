import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jjfleiciploxqesdmdhh.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ujKGNU-9TXIZFwSA4sUuDg_RH7G9q3m";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseUserProfile {
  email: string;
  role: "DEPARTMENT_MANAGER" | "EMPLOYEE";
  full_name: string;
  department: string;
  last_login?: string;
}

/**
 * Saves or updates user session/profile in Supabase
 */
export async function syncUserToSupabase(profile: SupabaseUserProfile) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          email: profile.email,
          role: profile.role,
          full_name: profile.full_name,
          department: profile.department,
          last_login: new Date().toISOString(),
        },
        { onConflict: "email" }
      )
      .select();

    if (error) {
      console.warn("Supabase profiles table sync note:", error.message);
      // Fallback: try logging to an activity table or localStorage if table schema differs
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase sync exception:", err);
    return { error: err };
  }
}

export type ActivationCheck =
  | { status: "ok"; first_name: string; username: string }
  | { status: "already_activated"; first_name: string; username: string }
  | { status: "not_found" };

/** Checks that the Employee ID + email pair exists in `employees` (see supabase/*.sql). */
export async function verifyEmployeeForActivation(employeeId: string, email: string): Promise<ActivationCheck> {
  const { data, error } = await supabase.rpc("verify_employee_for_activation", { p_employee_id: employeeId, p_email: email });
  if (error) throw error;
  return data as ActivationCheck;
}

/** Marks the account activated and stores a bcrypt hash of the temporary password. */
export async function activateEmployee(employeeId: string, email: string, tempPassword: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("activate_employee", { p_employee_id: employeeId, p_email: email, p_temp_password: tempPassword });
  if (error) throw error;
  return Boolean(data);
}

/** 10-char temporary password that satisfies the app's password rules (upper, lower, digit, symbol). */
export function generateTempPassword(length = 10): string {
  const sets = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnpqrstuvwxyz", "23456789", "!@#$%&*?"];
  const all = sets.join("");
  const rand = (n: number) => crypto.getRandomValues(new Uint32Array(1))[0] % n;
  const chars = sets.map((s) => s[rand(s.length)]);
  while (chars.length < length) chars.push(all[rand(all.length)]);
  for (let i = chars.length - 1; i > 0; i--) { const j = rand(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
  return chars.join("");
}

