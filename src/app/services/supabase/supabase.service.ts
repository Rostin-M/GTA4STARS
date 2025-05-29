import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  DatabaseReview,
  FormattedReview,
} from '../../interfaces/supabase.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://fstrcicvzlrweqxqklbg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdHJjaWN2emxyd2VxeHFrbGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTYxMDksImV4cCI6MjA2MzI3MjEwOX0.tOLhDeUbDdyoOgASEb0474jH-p7ywQEy2H6IkQpFHHY'
    );
  }

  async getReviews(): Promise<FormattedReview[]> {
    const { data, error } = await this.supabase.from('reviews').select(`
        content,
        rating,
        user_id (name),
        car_id (brand, model)
      `);

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    if (!data) return [];

    return (data as DatabaseReview[]).map((review) => ({
      img: 'https://i.ibb.co/Jt5Z6PB/gta-bg.jpg',
      alt: `Cliente ${review.user_id?.name || 'Anónimo'}`,
      message: review.content,
      name: review.user_id?.name || 'Cliente',
      stars: review.rating,
      car: `${review.car_id?.brand || ''} ${review.car_id?.model || ''}`.trim(),
    }));
  }

  async registerUser(user: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<{ success: boolean; message: string }> {
    const { data: lastUser, error: lastUserError } = await this.supabase
      .from('users')
      .select('code')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    let nextCode = 'USR-001';
    if (!lastUserError && lastUser && lastUser.code) {
      const lastNumber = parseInt(lastUser.code.split('-')[1], 10);
      const newNumber = lastNumber + 1;
      nextCode = `USR-${newNumber.toString().padStart(3, '0')}`;
    }

    const { data, error } = await this.supabase.from('users').insert([
      {
        code: nextCode,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role || 'Cliente',
        registration_date: new Date().toISOString().slice(0, 10),
        status: 'Activo',
      },
    ]);

    if (error) {
      if (error.code === '23505') {
        return { success: false, message: 'El correo ya está registrado.' };
      }
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Registro exitoso.' };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: any }> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      return { success: false, message: 'Correo o contraseña incorrectos.' };
    }
    return { success: true, message: 'Inicio de sesión exitoso.', user: data };
  }

  async getPurchaseHistory(
    userId: number,
    page: number = 1,
    pageSize: number = 5
  ): Promise<{ data: any[]; total: number }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this.supabase
      .from('purchase_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('purchase_date', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Supabase error:', error);
      return { data: [], total: 0 };
    }
    return { data: data || [], total: count || 0 };
  }

  async getUserReviewsWithReplies(userId: number): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('reviews')
      .select(
        `
      id,
      content,
      rating,
      review_date,
      user_id (
        name,
        avatar
      ),
      replies (
        content,
        reply_date,
        user_id (
          name,
          avatar,
          role
        )
      )
    `
      )
      .eq('user_id', userId)
      .order('review_date', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return (data || []).map((review: any) => ({
      username: review.user_id?.name || 'Usuario',
      avatar:
        review.user_id?.avatar || 'assets/general/profile-placeholder.png',
      date: review.review_date,
      content: review.content,
      rating: review.rating,
      actions: { useful: 0 },
      reply:
        review.replies && review.replies.length > 0
          ? {
              username: review.replies[0].user_id?.name || 'Vendedor',
              avatar:
                review.replies[0].user_id?.avatar ||
                'assets/general/profile-placeholder.png',
              badge:
                review.replies[0].user_id?.role === 'Vendedor'
                  ? '(Vendedor)'
                  : '',
              date: review.replies[0].reply_date,
              content: review.replies[0].content,
            }
          : null,
    }));
  }

  async getCars(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('cars')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }
    return data || [];
  }

  async getVehicles(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('cars')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }
    return data || [];
  }

  async registerSale(sale: {
    client_id: number;
    vehicle_id: number;
    price: number;
    payment_method_id: number;
    status: string;
  }): Promise<{ success: boolean; message: string }> {
    const { data: lastSale, error: lastSaleError } = await this.supabase
      .from('sales')
      .select('code')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    let nextCode = 'SAL-001';
    if (!lastSaleError && lastSale && lastSale.code) {
      const lastNumber = parseInt(lastSale.code.split('-')[1], 10);
      const newNumber = lastNumber + 1;
      nextCode = `SAL-${newNumber.toString().padStart(3, '0')}`;
    }

    const { error } = await this.supabase.from('sales').insert([
      {
        code: nextCode,
        client_id: sale.client_id,
        vehicle_id: sale.vehicle_id,
        price: sale.price,
        sale_date: new Date().toISOString().slice(0, 10),
        payment_method_id: sale.payment_method_id,
        status: sale.status,
      },
    ]);

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Venta registrada correctamente.' };
  }

  async getVehicleById(id: number): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cars')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }
    return data;
  }

  async getUsers(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true });
    if (error) {
      console.error('Supabase error:', error);
      return [];
    }
    return data || [];
  }

  async deleteUser(userId: number): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', userId);
    return { error };
  }

  async deleteCar(carId: number): Promise<{ error: any }> {
    const { error } = await this.supabase.from('cars').delete().eq('id', carId);
    if (error) {
      console.error('Supabase error:', error);
    }
    return { error };
  }

  async getSales(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('sales')
      .select(
        `
        id,
        code,
        sale_date,
        status,
        client:client_id (
          name,
          email
        ),
        vehicle:vehicle_id (
          model,
          brand,
          price,
          max_speed,
          fuel,
          year
        ),
        payment_method:payment_method_id (
          method
        )
      `
      )
      .order('sale_date', { ascending: false });
    if (error) {
      console.error('Supabase error:', error);
      return [];
    }
    return data || [];
  }
}
