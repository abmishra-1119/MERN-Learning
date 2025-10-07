import Question1 from "./easy/Question1.jsx";
import Question2 from "./easy/Question2.jsx";
import Question3 from "./easy/Question3.jsx";
import Question4 from "./easy/Question4.jsx";
import QuestionM1 from "./medium/QuestionM1.jsx";
import QuestionM2 from "./medium/QuestionM2.jsx";
import QuestionM3 from "./medium/QuestionM3.jsx";
import QuestionM4 from "./medium/QuestionM4.jsx";
import QuestionM5 from "./medium/QuestionM5.jsx";
import QuestionSh1 from "./semi-hard/QuestionSH1.jsx";
import QuestionSh2 from "./semi-hard/QuestionSH2.jsx";
import QuestionSh3 from "./semi-hard/QuestionSH3.jsx";

function App() {

    return (
        <>
            <div>
                <h2 className={'font-bold text-3xl'}>Easy Questions</h2>
                <br/>
                <Question1/>
                <br/>
                <Question2/>
                <br/>
                <Question3/>
                <br/>
                <Question4/>
                {/*Virtual Dom is lightweight copy of the actual dom. it only take the synthetic events of the actual. It does not have a html element it take the element in object form.*/}

                <h2 className={'font-bold text-3xl'}>Medium Questions</h2>
                <br/>
                <QuestionM1/>
                <br/>
                <QuestionM2/>
                <br/>
                <QuestionM3/>
                <br/>
                <QuestionM4/>
                <br/>
                <QuestionM5/>

                <h2 className={'font-bold text-3xl'}>Semi-Hard Questions</h2>
                <br/>
                <QuestionSh1/>
                <br/>
                <QuestionSh2/>
                <br/>
                <QuestionSh3/>

            </div>
        </>
    )
}

export default App
