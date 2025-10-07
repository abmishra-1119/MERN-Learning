import React, {useState} from 'react';

const UserCard = ({name, age, id}) => {
    return (
        <div className={'border p-3'} key={id}>
            <h3>{name}</h3>
            <h3>{age}</h3>
        </div>
    )
}

function QuestionM1() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [data, setData] = useState([])


    const DataSet = (newData) => {
        setData(prevArray => [...prevArray, newData])
        console.log(data)
    }

    return (
        <div>
            <div>
                <input onChange={(e) => setName(e.target.value)} type={'text'} placeholder={"Enter Name"}
                       className={'border p-1 mx-3'}/>
                <input onChange={(e) => setAge(Number(e.target.value))} type={'number'} placeholder={"Enter age"}
                       className={'border p-1 mx-3'}/>
                <button className={'border p-1'} onClick={() => DataSet({name, age})}>Click</button>
                {
                    data.map((user, id) => {
                        return <UserCard key={id} name={user.name} age={user.age}/>
                    })
                }
            </div>

        </div>
    );
}

export default QuestionM1;