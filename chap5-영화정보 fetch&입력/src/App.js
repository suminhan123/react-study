import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-e5f5b-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) { // 파싱 전에 처리를 해줘야 함
        throw new Error('something went wrong'); // 응답에 문제가 있을 때 표시
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      // const transformedMovie = data.map(movieData => {
      //   return {
      //     id: movieData.episode_id,
      //     title : movieData.title,
      //     openingText : movieData.opening_crawl,
      //     releaseDate : movieData.release_date
      //   };
      // });
      // setMovies(transformedMovie);
      setMovies(loadedMovies);
    }catch(e){
      setError(e.message); // 오류 상태를 관리
    }
    setIsLoading(false); // 성공했거나 오류가 생겼거나 둘 다 로딩을 false로
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); 
  // 함수에 대한 포인터를 의존성 배열에 넣어줌 => 외부에서 사용될 때 버그가 발생 할 수 있음
  // 해당 컴포넌트가 재렌더링 될 때마다 새로운 함수를 리턴하기 때문에 useEffect가 샐행됨 => 무한루프

  async function addMovieHandler(movie){
    const response = await fetch('https://react-http-e5f5b-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),// json 형태로 movie를 변경해서 보내야 함
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies</p>
  if (movies.length > 0){
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading..</p>
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
