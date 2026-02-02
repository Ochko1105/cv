'use client'
import { useEffect, useState } from 'react'

// --- Төрлүүдийг тодорхойлох ---
type Todo = { 
  id: number; 
  title: string; 
  completed: boolean 
}

type GraphQLResponse<T> = {
  data: T;
  errors?: any[];
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  // --- Drag and Drop Логик ---
  const onDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Drop хийх боломжийг нээж өгнө
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newTodos = [...todos];
    const draggedItem = newTodos[draggedItemIndex];
    
    // Байрыг нь солих
    newTodos.splice(draggedItemIndex, 1);
    newTodos.splice(index, 0, draggedItem);
    
    setDraggedItemIndex(index);
    setTodos(newTodos);
  };

  const onDragEnd = () => {
    setDraggedItemIndex(null);
    // Зөвлөмж: Энд шинэ дарааллыг бааз руу хадгалах Mutation дуудаж болно
    console.log("Шинэ дараалал хадгалахад бэлэн:", todos);
  };

  // --- Console Log Style ---
  const logGraphQL = (action: string, query: string, data?: any) => {
    console.group(`🚀 GraphQL ${action}`);
    console.log('%c Query:', 'color: #007bff; font-weight: bold', query);
    if (data) {
      console.log('%c Response Data:', 'color: #28a745; font-weight: bold');
      console.table(data);
    }
    console.groupEnd();
  }

  // --- API Функцүүд ---
  const fetchTodos = async () => {
    const query = '{ todos { id title completed } }';
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const json = (await res.json()) as GraphQLResponse<{ todos: Todo[] }>;
      if (json.data) {
        setTodos(json.data.todos);
        logGraphQL('Fetching', query, json.data.todos);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  const addTodo = async () => {
    if (!title.trim()) return;
    setLoading(true);
    const query = `mutation { addTodo(title: "${title}") { id title completed } }`;
    
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const json = (await res.json()) as GraphQLResponse<{ addTodo: Todo }>;
      logGraphQL('Added', query, json.data?.addTodo);
      setTitle('');
      await fetchTodos();
    } finally {
      setLoading(false);
    }
  }

  const toggleTodo = async (id: number) => {
    const query = `mutation { toggleTodo(id: ${id}) { id completed } }`;
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    logGraphQL('Toggled', query);
    fetchTodos();
  }

  const deleteTodo = async (id: number) => {
    const query = `mutation { deleteTodo(id: ${id}) }`;
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    logGraphQL('Deleted', query);
    fetchTodos();
  }

  useEffect(() => { fetchTodos() }, [])

  // --- UI Render ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold tracking-tight">GraphQL Todo</h1>
          <p className="text-blue-100 text-sm mt-1">Cloudflare D1 + Drizzle ORM</p>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-8">
            <input 
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
              placeholder="Шинэ ажил нэмэх..."
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-95 disabled:bg-blue-300"
              onClick={addTodo}
            >
              {loading ? '...' : 'Нэмэх'}
            </button>
          </div>

        <div className="space-y-3">
  {todos.length > 0 ? (
    todos.map((t, index) => (
      <div 
        key={t.id}
        draggable
        onDragStart={() => setDraggedItemIndex(index)}
        onDragOver={(e) => {
          e.preventDefault();
          if (draggedItemIndex === null || draggedItemIndex === index) return;
          const newTodos = [...todos];
          const draggedItem = newTodos[draggedItemIndex];
          newTodos.splice(draggedItemIndex, 1);
          newTodos.splice(index, 0, draggedItem);
          setDraggedItemIndex(index);
          setTodos(newTodos);
        }}
        onDragEnd={() => setDraggedItemIndex(null)}
        className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-move group ${
          draggedItemIndex === index 
            ? 'bg-blue-50 border-blue-200 opacity-50 scale-95 shadow-inner' 
            : 'bg-gray-50 border-gray-100 hover:shadow-md hover:bg-white'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Чирэхэд зориулсан дүрс */}
          <div className="text-gray-300 group-hover:text-gray-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
              <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
            </svg>
          </div>

          <input 
            type="checkbox" 
            className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={t.completed} 
            onChange={() => toggleTodo(t.id)} 
          />
          <span className={`font-medium transition-all ${t.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {t.title}
          </span>
        </div>
        
        <button 
          className="text-gray-400 hover:text-red-500 p-1 md:opacity-0 group-hover:opacity-100 transition-all"
          onClick={() => deleteTodo(t.id)}
        >
          Устгах
        </button>
      </div>
    ))
  ) : (
    <div className="text-center py-10">
      <p className="text-gray-400 italic">Жагсаалт хоосон байна ✨</p>
    </div>
  )}
</div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            F12 дарж Console-оос датаг хараарай
          </p>
        </div>
      </div>
    </div>
  )
}