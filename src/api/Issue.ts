import  axios  from "axios";
import { Type } from "../Interface/type";
import { handleApiError, handleApiSuccess } from "../utils/error_handler";


const api =  axios.create({
    baseURL: 'http://localhost:8000'
});

export async function getIssue(): Promise<Type[]> {
  try{
    const response = await api.get<Type[]>('/issues');
    return response.data
  } catch (error) {
    handleApiError(error, { Msg: 'failed to load issue' })
    return[]
  }
} 
export async function createIssue(payload: Omit<Type, "id" | "createdAt">): Promise<Type> {
  try{
    const body = { ...payload, createdAt: new Date().toISOString() };
    const response = await api.post<Type>('/issues', body);
    return response.data
  } catch (error) {
    handleApiError(error, { Msg: 'failed to create issue' })
    throw error
  }
} 
export async function updateIssue(id: string, patch: Partial<Type>) {
  try{
    const response = await api.patch<Type>(`/issues/${id}`, patch);
    handleApiSuccess("issue updated successfully")
    return response.data
  } catch (error) {
    handleApiError(error, { Msg: 'failed to update issue' })
    throw error
  }
} 
export async function deleteIssue(id: string) {
  try {
    const res = await api.delete(`/issues/${id}`);
    handleApiSuccess("Issue deleted");
    return res.data;
  } catch (error) {
    handleApiError(error, {Msg: "Failed to delete issue"});
    throw error;
  }
}


