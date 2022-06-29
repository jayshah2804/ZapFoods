import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch("https://react-hhtp28-default-rtdb.firebaseio.com/meals.json");
      const responseData = await response.json();

      const loadedMeals = [];
      for(const key in responseData){
        // console.log(key);
        // console.log(responseData.key);
        // console.log(responseData[key]);
        loadedMeals.push({
          id: key,
          description: responseData[key].description,
          name: responseData[key].name,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    }
    fetchMeals();
  },[]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;