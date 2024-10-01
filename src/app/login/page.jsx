const Login = () => {
  return (
    <div className="flex flex-col  w-screen h-screen items-center justify-center rounded p-4">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <form action="" className="p-8 bg-slate-900 w-2/6 flex gap-5 flex-col py-20">
     <input type="text" placeholder="username" className="p-3 bg-slate-950 rounded" name="username"/>
     <input type="text" placeholder="password" className="p-3 bg-slate-950 rounded" name="password"/>
     <button className="bg-green-500 p-3 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login