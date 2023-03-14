// Calorie Tracker

class trackCalorie{
    constructor(){
        this._calorieLimit = 100
        this._totalCalorie = 0
        this._meals = []
        this._workouts = []
    }

// Public Methods

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalorie += meal.calories
    }

    addWorkout(workouts){
        this._workouts.push(workouts)
        this._totalCalorie -= workouts.calories
    }



//Private Methods

}



// Meal
class Meal{
    constructor(name , calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name
        this.calories = calories
    }
}


// Workouts
class Workout{
    constructor(name , calories){
        this.id = Math.random().toString(16).slice(2)
        this.name = name
        this.calories = calories
    }
}

const tracker = new trackCalorie()
const meal = new Meal('Breakfast',500)
const meal2 = new Meal('Launch',200)
const workout = new Workout('Running',300)

tracker.addMeal(meal)
tracker.addMeal(meal2)

console.log(tracker._meals)