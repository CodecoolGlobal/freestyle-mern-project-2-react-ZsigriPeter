
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Login.css";

function fetchQuizResults() {
    return fetch("/api/leaderboard").then(response => response.json());
}

function fetchUserById(id) {
    return fetch(`/api/user/${id}`).then(res=>res.json());
}

function LeaderBoard(props) {
    const [qiuzResults,setQuizResults]=useState(null);
    const [loading,setLoading]=useState(true);
    const [userNames,setUserNames]=useState();

    useEffect(()=> {
        fetchQuizResults()
        .then((qRes)=> {
            setQuizResults(qRes);
            setLoading(false);
        })
    },[])

    
    
    if(loading) {
        return (<h1>Loading...</h1>);
    }
    return (
        <div className="Leaderboard">
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Quiz Result</th>
                        <th>Result Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {qiuzResults.map((quizResult)=>(
                        <tr key={quizResult._id}>
                            <td>{quizResult.userName}</td>
                            <td>{quizResult.result} point(s)</td>
                            <td>{quizResult.percentage}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderBoard;