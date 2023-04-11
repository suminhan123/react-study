import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData(); // defer된 데이터 events값

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;

  // return <EventsList events={events} />;
  return (
    // 다른 데이터가 도착하길 기다리는 동안에 폴백을  보여주는 특정한 상황에 사용
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
      {/* // 해당 데이터가 올때까지 기다림 await 컴포넌트 
      // 데이터가 도착하면 , 그
      promise가 resolving 되고 */}
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
// promise를 반환할 때까지 기다리지 않을 거임
export function loader() {
  return defer({
    events: loadEvents(), // 페이지에서 오가는 http 통신 모두 넣어줘야 함 => 반환한 값을 events에 넣어줌
  });
}
