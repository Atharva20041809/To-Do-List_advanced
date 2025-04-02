import "./app.css"
import {useState,useEffect} from 'react'
function App() {
  
  const [tasklist,settasklist]=useState([]);
  // useEffect(()=>{
  //   console.log(localStorage.getItem('tasks'))
  //   const List = localStorage.getItem('tasks')
  //   if (List)  settasklist([]);
  //   else settasklist(JSON.parse(List))
  //   console.log(tasklist)
  // },[])
  
  let [taskobj,settaskobj]=useState({title:"",description: "",edit:false})
  let [original,setoriginal]=useState([])


  function handeltitle(event){
    let newobj={...taskobj}
    newobj.title=event.target.value 
    settaskobj(newobj)
  }
  function handeldescription(event){
    let newobj={...taskobj}
    newobj.description=event.target.value
    settaskobj(newobj)
  }
  function handeladdtask(){
    if (taskobj.title=="" || taskobj.description==""){
      {alert("Please fill the input box")}
    }else{
      let newarr=[...tasklist]
      newarr.push(taskobj)
      settasklist(newarr)
      localStorage.setItem("tasks",JSON.stringify(newarr))
      setoriginal(newarr)
      settaskobj({title:"",description: "",edit:false})
    }
  }
  function handelremove(key){
    let newarr=tasklist.filter((ele,index)=>{
      return index!=key
    })
    settasklist(newarr)
    setoriginal(newarr)
    localStorage.setItem("tasks",JSON.stringify(tasklist))


  }
  function handeledit(key){
    let newarr=[...tasklist]
    newarr[key].edit=true
    setoriginal(newarr)
    settasklist(newarr)
    localStorage.setItem("tasks",JSON.stringify(tasklist))


  }
  function handelchange(key){
    if (taskobj.title=="" || taskobj.description==""){
      {alert("Please fill the input box")}
    }else{
      let newarr=[...tasklist]
      newarr[key] ={...taskobj,edit:false};
      settasklist(newarr)
      setoriginal(newarr)
      localStorage.setItem("tasks",JSON.stringify(tasklist))
      settaskobj({title:"",description: "",edit:false})
    }
  }
  function handelsearch(event){
      settasklist(original.filter((ele)=>{
        return ele.title.toString().toLowerCase().includes(event.target.value.toString().toLowerCase()) || event.target.value.length==0
      }))
      localStorage.setItem("tasks",JSON.stringify(tasklist))
  }
  return <>
  <div className="taskcreater">
    <input placeholder="search your task here" onChange={handelsearch} className="searchbar"/>
    <input className="createtaskinput" onChange={handeltitle} placeholder="Title"/>
    <input className="createtaskinput" onChange={handeldescription} placeholder="Description"/>
    <button className="addtask" onClick={handeladdtask}>ADD TASK</button>
  </div>
  <div className="container">
    {
      (tasklist.map((ele,index)=>{
        if(ele.edit==true){
            return <div className="editing">
              <input className="taskinput" onChange={handeltitle} placeholder="Title"/>
              <input className="taskinput" onChange={handeldescription} placeholder="Description"/>
              <button onClick={()=>{handelchange(index)}} className="change">Change</button>
            </div>
        }else{
          return <div className="task">
            <h1 className="tasktitle">{ele.title}</h1>
            <p className="taskdescription">{ele.description}</p>
            <button onClick={()=>{handelremove(index)}} className="remove">Remove</button>
            <button onClick={()=>{handeledit(index)}} className="Edit">Edit</button>
          </div>
        }
      }))
    }
  </div>
  </>
}
export default App