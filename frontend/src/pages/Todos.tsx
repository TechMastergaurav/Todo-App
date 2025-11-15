import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/auth";

export default function Todos() {
  const qc = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const logout = useAuth((s) => s.logout);

 
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

 
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await api.get("/todos");
      return res.data;
    },
  });

  
  const add = useMutation({
    mutationFn: (payload: any) => api.post("/todos", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  
  const toggle = useMutation({
    mutationFn: (payload: any) =>
      api.put(`/todos/${payload.id}`, { completed: payload.completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  
  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/todos/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  
  const saveEdit = async (id: string) => {
    await api.put(`/todos/${id}`, { title: editText });
    qc.invalidateQueries({ queryKey: ["todos"] });
    setEditId(null);
  };

  const onSubmit = (data: any) => {
    add.mutate(data);
    reset();
  };

  return (
    <div className="max-w-xl mx-auto">

      
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">My Todos</h2>

        <button
          onClick={logout}
          className="text-red-600 font-medium hover:underline"
        >
          Logout
        </button>
      </div>

   
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 mb-5"
      >
        <input
          {...register("title")}
          placeholder="New todo"
          className="flex-1 border p-3 rounded-xl shadow-sm"
          required
        />
        <button className="bg-green-600 text-white px-4 rounded-xl shadow">
          Add
        </button>
      </form>

      
      <ul className="space-y-3">

        {todos?.length === 0 && (
          <li className="text-center text-gray-500">No todos yet…</li>
        )}

        {todos?.map((t: any) => (
          <li
            key={t._id}
            className="flex justify-between items-center p-3 border rounded-xl bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
         
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() =>
                  toggle.mutate({ id: t._id, completed: !t.completed })
                }
              />

          
              {editId === t._id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-2 rounded w-40"
                />
              ) : (
                <div className={t.completed ? "line-through text-gray-500" : ""}>
                  {t.title}
                </div>
              )}
            </div>

            
            <div className="flex items-center gap-3">
              {editId === t._id ? (
                <>
                  <button
                    onClick={() => saveEdit(t._id)}
                    className="text-green-600 font-semibold"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditId(t._id);
                    setEditText(t.title);
                  }}
                  className="text-blue-600 font-semibold"
                >
                  Edit
                </button>
              )}

             
              <button
                onClick={() => del.mutate(t._id)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


