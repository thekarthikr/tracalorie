// Calorie Tracker

class trackCalorie{
    constructor(){
        this._calorieLimit = 2000
        this._totalCalorie = 0
        this._meals = []
        this._workouts = []
        this._displayCaloriesTotal()
        this._displayCaloriesLimit()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
    }

// Public Methods

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalorie += meal.calories
        this._render()
    }

    addWorkout(workouts){
        this._workouts.push(workouts)
        this._totalCalorie -= workouts.calories
        this._render()
    }



//Private Methods

_displayCaloriesTotal(){
  const totalCaloriesEl = document.getElementById('calories-total')
  totalCaloriesEl.innerHTML = this._totalCalorie;
}

_displayCaloriesLimit(){
    const caloriesLimitEl = document.getElementById('calories-limit')
    caloriesLimitEl.innerHTML = this._calorieLimit
}

_displayCaloriesConsumed(){
    const caloriesConsumedEl = document.getElementById('calories-consumed')
  const consumed = this._meals.reduce((total,meal)=> total + meal.calories,0)
  caloriesConsumedEl.innerHTML = consumed
}

_displayCaloriesBurned(){
    const caloriesBurnedEl = document.getElementById('calories-burned')
    const burned = this._workouts.reduce((total,workout)=> total+ workout.calories,0)
    caloriesBurnedEl.innerHTML = burned
}

_displayCaloriesRemaining(){
    const caloriesRemainingEl = document.getElementById('calories-remaining')
    const remaining = this._calorieLimit - this._totalCalorie
    caloriesRemainingEl.innerHTML = remaining
}


_render(){
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
}

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

const bf = new Meal('Breakfast',300)
const l = new Meal('Launch', 200)
const workout = new Workout('running',400)

tracker.addMeal(l)
tracker.addMeal(bf)

tracker.addWorkout(workout)