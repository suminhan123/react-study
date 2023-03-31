import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => { // useEffect 는 promise 를 반환해서는 안됨 클린업을 사용할지도 모름 => 비동기 async await 오류 발생 => 중첩된 함수를 
    // 활용해서 비동기 통신이 가능
    const fetchMeals = async () => { 
      const response = await fetch('https://react-food-http-6964e-default-rtdb.firebaseio.com/meals.json');
      
      if(!response.ok){
        throw new Error('something wrong');
      }

      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
      
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
    
  }, []) // 외부 데이터를 쓰지 않으니 처음 실행될 때 한번만 실행되게 하기

  if(isLoading){
    return <section className={styles.MealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if (httpError) {
    return <section className={styles.MealsError}>
    <p>{httpError}</p>
  </section>
  }

    const mealsList = meals.map(meal => (
        <MealItem 
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />))
    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>

}
export default AvailableMeals;