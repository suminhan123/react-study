import { useState } from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest } = useHttp(); 

  const createTask = (taskText, taskData) => { // taskText를 찾게 하기 위해 인자에 넣어줌 그리고 바인드를 걸음
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({ // 클릭할 때만 set 함수 호출 => useEffect 가 아님
      url: 'https://react-http-ac422-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {text: taskText},
    }, createTask.bind(null, taskText) // bind 메소드는 함수를 사전에 구성할 수 있게함 즉시 함수가 바로 실행되지 않음 
    // 두번째 인자로 받게 됨 applyData에
    ); // 이 컴포넌트는 재평가되어도 전송되지 않아 무한 루프에 빠지지 않음 => usecallback 필요가 없음
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
