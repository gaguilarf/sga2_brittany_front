import { apiClient } from "./client";
import {
  CreatePaymentDto,
  PaymentResponse,
} from "@/features/matriculas/models/EnrollmentModels";

export const PaymentService = {
  async create(data: CreatePaymentDto): Promise<PaymentResponse> {
    const res = await apiClient.post<PaymentResponse>("/payments", data);
    if (!res.data) throw new Error("Error creating payment");
    return res.data;
  },

  async getByEnrollmentId(enrollmentId: number): Promise<PaymentResponse[]> {
    const res = await apiClient.get<PaymentResponse[]>(
      `/payments/enrollment/${enrollmentId}`
    );
    return res.data || [];
  },

  async getAll(): Promise<PaymentResponse[]> {
    const res = await apiClient.get<PaymentResponse[]>("/payments");
    return res.data || [];
  },
};
