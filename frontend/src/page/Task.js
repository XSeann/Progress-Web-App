//REACT
import { useEffect, useState } from 'react'

//CSS
import './Task.css'

//COMPONENTS
import SelectBar from '../components/SelectBar'
import PopUp from '../components/PopUp'

//HOOKS
import { useAuthContext } from '../hooks/useAuthContext'

//SCRIPTS
import { arrayEmpty, arrayEmptyOne, arrayItemAdd, arrayItemDelete, arrayItemReset, arrayMatchValue } from '../scripts/ArrayScripts'
import { postData } from '../scripts/FormScripts'

function Task() {
    const [taskData, setTaskData] = useState({taskTag: '', taskGetTag: [], taskTagChange: '', taskGetInputs: [], taskInputsData: [], ok: undefined, error: []})
    const {user} = useAuthContext()

    function gridTidy(num) {
        const gridSize = 100 / num
        let gridCol = ''
        for (let i = 0; i < num; i++) {
            gridCol += (gridSize - 0.35) + "% "
        }
        return gridCol
    }

    function changeData(f, pos, pos2) {
        const arr = Array.from(taskData.taskInputsData)

        arr[pos][pos2] = f.target.value
        
        setTaskData(e => ({...e, taskInputsData: arr}))
    }

    function addInp() {
        const temporaryArray = Array.from(taskData.taskInputsData)
        const input = taskData.taskTagChange !== '' && taskData.taskGetInputs[taskData.taskGetTag.indexOf(taskData.taskTagChange)]

        function loop(array, str, pos, length) {
            for (let j = pos; j < temporaryArray.length; j+=length) {
                array[j][0] = str
            }
        }
        
        for (let i = 0; i < input.length; i++) {
            temporaryArray.push(["", ""])
        }

        for (let i = 0; i < input.length; i++) {
            loop(temporaryArray, input[i][0], i, input.length)
        }

        setTaskData(e => ({...e, taskInputsData: taskData.taskTagChange !== '' ? temporaryArray : arrayItemAdd(taskData.taskInputsData, ["", ""])}))
    }

    function delInp(num) {
        setTaskData(e => ({...e, taskInputsData: arrayItemDelete(taskData.taskInputsData, num)}))
    }

    async function submit() {

        const empty = []
        const err = []

        for (let i = 0; i < taskData.taskInputsData.length; i++) {
            empty[i] = arrayEmpty(taskData.taskInputsData[i], 'empty')
        }

        if (!taskData.taskInputsData.length) {
            err.push("Add Task")
        }

        if (arrayEmptyOne(empty) && taskData.taskInputsData.length) {
            err.push("Fill All the Red Fields!")
        }

        if (!taskData.taskTag.split("").filter(e => e!=="").length && taskData.taskInputsData.length) {
            err.push("Task Tag is Empty!")
        }

        if (err.length) {
            setTaskData(e => ({...e, error: []}))
            setTimeout(() => {
                setTaskData(e => ({...e, error: err}))
            }, 100)
            return
        }

        setTaskData(e => ({...e, error: err}))

        const responsePost = await postData('http://localhost:7000/api/file', {task: {taskTag: taskData.taskTag, taskData: taskData.taskInputsData}, owner: user.email})

        const array = Array.from(taskData.taskInputsData)
        for (let i = 0; i < taskData.taskInputsData.length; i++) {
            if (taskData.taskTagChange !== '') {array[i][1] = ''}
            else {array[i] = arrayItemReset(taskData.taskInputsData[i])}
        }

        setTaskData(e => ({...e, taskTag: taskData.taskTagChange !== '' ? taskData.taskTagChange : '', taskInputsData: array, ok: responsePost}))

        setTimeout(() => {
            setTaskData(e => ({...e, ok: undefined}))
        }, 4000)
    }
    
    async function submitTaskTmp() {
        const empty = []
        const err = [] 

        for (let i = 0; i < taskData.taskInputsData.length; i++) {
            if (!taskData.taskInputsData[i][0].split('').filter(e => e!==' ').length) {
                empty[i] = 'empty'
            }
        }

        if (!taskData.taskTag.split("").filter(e => e!=="").length && taskData.taskInputsData.length) {
            err.push("Task Tag is Empty!")
        }

        if (arrayMatchValue(taskData.taskGetTag, taskData.taskTag) && taskData.taskInputsData.length) {
            err.push("Your Task Tag should be Unique!")
        }

        if (arrayEmptyOne(empty) && taskData.taskInputsData.length) {
            err.push("Fill All the Task Name!")
        }

        if (err.length) {
            setTaskData(e => ({...e, error: []}))
            setTimeout(() => {
                setTaskData(e => ({...e, error: err}))
            }, 100)
            return
        }

        setTaskData(e => ({...e, error: err}))

        const responsePost = await postData('http://localhost:7000/api/taskTmp', {task: {taskTag: taskData.taskTag , taskData: taskData.taskInputsData}, owner: user.email})

        setTaskData(e => ({...e, ok: responsePost}))

        getTaskTmp()

        setTimeout(() => {
            setTaskData(e => ({...e, ok: undefined}))
        }, 4000)

    }

    async function getTaskTmp() {
        const responseGet = await postData(`http://localhost:7000/api/taskTmp/email`, {email: user.email})

        const temporaryArray = []
        const temporaryArray2 = []

        for (const key in responseGet) {
            temporaryArray.push(responseGet[key].task.taskTag)
            temporaryArray2.push(responseGet[key].task.taskData)
        }

        setTaskData(e => ({...e, taskGetTag: temporaryArray, taskGetInputs: temporaryArray2}))
    }

    useEffect(() => {
        getTaskTmp()
    }, [])

    function templateChange(tag) {
        setTaskData(e => ({...e, taskTag: tag, taskTagChange: tag}))
    }

    return (
        <div className='TaskPage'>
            <form className='TaskForm' autoComplete='off' onSubmit={(e) => e.preventDefault()}>
                <div className='TaskFormInpCon' style={{gridTemplateColumns: gridTidy(1)}}>
                    <input  type='text' 
                            className={`inp ${(taskData.error.indexOf("Task Tag is Empty!") !== -1 || taskData.error.indexOf("Your Task Tag should be Unique!") !== -1) ? "error" : ""}`} 
                            value={taskData.taskTag} onChange={(f) => setTaskData(e => ({...e, taskTag: f.target.value}))} placeholder='Task Tag'
                    />
                </div>
                <SelectBar data={taskData.taskGetTag ? taskData.taskGetTag : ['Choose Template']} headData={'Select Template'} onClick={taskData.taskGetTag ? templateChange : () => {}} styleSelect={{background: '#222', color: '#fff', fontSize: '20px'}} styleBar={{background: '#222', color: '#fff', fontSize: '20px'}} styleBarSelect={{background: '#222', hover: {background: '#333'}}}/> 
                <div className='TaskFormInpCon' style={{gridTemplateColumns: gridTidy(1)}}>
                    <div className='TaskFormInpCon2'>
                        {taskData.taskInputsData && taskData.taskInputsData.map((e, num) => 
                            <div className='TaskFormInpCon3' key={num}>
                                <div className='TaskFormInpCon4' style={{gridTemplateColumns: gridTidy(1)}}>
                                    <input  type='text' placeholder='Task Name' 
                                            className={`inp ${(!taskData.taskInputsData[num][0].split("").filter(e => e!==" ").length && (taskData.error.indexOf("Fill All the Red Fields!") !== -1 || taskData.error.indexOf( "Fill All the Task Name!") !== -1)) ? "error" : ""}`} 
                                            value={taskData.taskInputsData[num][0]} onChange={(f) => changeData(f, num, 0)}
                                    />
                                </div>
                                <div className='TaskFormInpCon4' style={{gridTemplateColumns: gridTidy(1)}}>
                                    <input  type='text' placeholder='Task Value' 
                                            className={`inp ${(!taskData.taskInputsData[num][1].split("").filter(e => e!==" ").length && taskData.error.indexOf("Fill All the Red Fields!") !== -1) ? "error" : ""}`} 
                                            value={taskData.taskInputsData[num][1]} onChange={(f) => changeData(f, num, 1)}
                                    />
                                </div>
                                <div className='TaskFormInpCon4' style={{gridTemplateColumns: gridTidy(1)}}>
                                    <span className='delete' onClick={() => delInp(num)}>X</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='TaskFormInpCon' style={{gridTemplateColumns: gridTidy(2)}}>
                    <span className='addInp' onClick={() => addInp()}>Add Task Detail</span>
                    <span className='submitForm' onClick={() => submit()}>Submit</span>
                </div>
                <div className='TaskFormTmpCon'>
                    {taskData.taskInputsData.length ? <span className='taskTmpBtn' style={{gridTemplateColumns: gridTidy(1)}} onClick={() => submitTaskTmp()}>Add as Task Template</span> : <></>}
                </div>
            </form>
            <div className='popUpsCon'>
                {taskData.error.length ? <PopUp message={taskData.error.length ? taskData.error.map(e => <span key={e}>{e}</span>) : ""} style={{background: 'red', border: '1px solid #ff0088', color: '#fff', fontWeight: '700'}}/> : <></>}
                {taskData.ok ? <PopUp message="Submission was Successful!" style={{background: 'green', color: '#fff', fontWeight: '700'}}/> : <></>}
            </div>
        </div>
    )
}

export default Task 