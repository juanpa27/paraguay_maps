import { supabase } from '../config/supabaseClient';
import { useAuthStore } from '../store/useAuthStore';

export async function loginSupabase(username, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Establecer el usuario en el estado global
    useAuthStore.setState({ user: data.user });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
