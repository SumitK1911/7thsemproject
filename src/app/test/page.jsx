const page = () => {
    const handleForm = async(formData) => {
        "use server"
        console.log('hello');
        console.log(formData)
    }
   return (
     <div>
        <form action={handleForm} className="flex flex-col gap-3 w-52  mt-20 m-auto">
            <input type="text" name="name" className="text-black"/>
            <input type="password" name="password" className="text-black"/>
            <input type="email" name="email" className="text-black"/>
            <button type="submit">Submit</button>
        </form>
     </div>
   )
 }
 
 export default page