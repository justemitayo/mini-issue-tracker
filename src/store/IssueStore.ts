import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Type } from "../Interface/type";
import { getIssue, createIssue, updateIssue, deleteIssue } from "../api/Issue";
import { handleApiError, handleApiSuccess } from "../utils/error_handler";


type State = {
  issues: Type[];
  previousIssues: Type[] | null;
  loading: boolean
};

type Action = {
  get_issues: () => Promise<void>;
  add_issue: (payload: Omit<Type, "id" | "createdAt" | "status"> & { status?: "Open" | "Closed" }) => Promise<void>;
  edit_issue: (id: string, patch: { title: string; description: string }) => Promise<void>;
  toggle_status: (id: string) => Promise<void>;
  remove_issue: (id: string) => Promise<void>;
  undoLastAction: () => void;
  clear_issues: () => void;
};

export const useIssueStore = create<
  State & Action,
  [['zustand/persist', unknown]]
>(
  persist(
    (set, get) => ({
      issues: [] as Type[],
      previousIssues: null,
      loading: false,

      get_issues: async() => {
        set({loading : true});
       
          const data = await getIssue();
          set({issues: data, loading: false})
      },
      add_issue: async(payload) => {
        const newIssue = await createIssue({...payload, status: payload.status ?? "Open"})
        set((state) => ({
          issues: [...state.issues, newIssue],
          previousIssues: state.issues
        }))
      },
      edit_issue: async(id, patch) => {
        const prev = get().issues
      const editIssue = await updateIssue(id, patch);
        set({
          previousIssues: prev,
          issues: prev.map((data) => (data.id === id ? editIssue : data))
        })
      },
      toggle_status: async(id) => {
        const current = get().issues
        const issue = current.find((i) => i.id === id);
        if (!issue) return;

        const toggle = await updateIssue(id, {
          status: issue.status === "Open" ? "Closed" : "Open",
        })
        set((state) => ({
          previousIssues: current,
          issues: state.issues.map((data) => data.id === id ? toggle : data)

        }))
      },
      remove_issue: async(id) => {
        const prev = get().issues
         await deleteIssue(id)
        set({
          previousIssues: prev,
          issues: prev.filter((data) => data.id !== id)
        })
      },
      undoLastAction: () => {
        const prev = get().previousIssues;
        if (!prev) return handleApiError(null, { Msg: "No action to undo" });
        set({ issues: prev, previousIssues: null });
        handleApiSuccess("Undo successful!");
      },
      clear_issues: () => {
        set({ issues: [], previousIssues: null });
        handleApiSuccess("All issues cleared!");
      },

      
    }),
    {
      name: "issue-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)