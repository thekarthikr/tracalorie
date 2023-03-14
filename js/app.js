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
        this._displayProgressBar()
    }

// Public Methods

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalorie += meal.calories
        this._displayNewMeal(meal)
        this._render()
    }

    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalorie -= workout.calories
        this._displayNewWorkout(workout)
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
    const progressEl = document.getElementById('calorie-progress')

    if(remaining < 0){
        caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light')
        caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger')
        progressEl.classList.remove('bg-success')
        progressEl.classList.add('bg-danger')
      }else{
        caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light')
        caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger')
        progressEl.classList.add('bg-success')
        progressEl.classList.remove('bg-danger')
      }
}

_displayProgressBar(){
    const progressEl = document.getElementById('calorie-progress')
    const progress = (this._totalCalorie / this._calorieLimit)* 100
    const width = Math.min(progress,100)
    progressEl.style.width = `${width}%`
}

_displayNewMeal(meal){
    const mealList = document.getElementById('meal-items')
    const  mealItem = document.createElement('div');
    mealItem.classList.add('card','my-2');
    mealItem.setAttribute('data-id',meal.id)
    mealItem.innerHTML = 
    `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1"> ${meal.name}</h4>
      <div
        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
      >
        ${meal.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    
    `
  mealList.appendChild(mealItem)

}

_displayNewWorkout(workout){
    const workoutList = document.getElementById('workout-items')
    const  workoutItem = document.createElement('div');
    workoutItem.classList.add('card','my-2');
    workoutItem.setAttribute('data-id',workout.id)
    workoutItem.innerHTML = 
    `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1"> ${workout.name}</h4>
      <div
        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
      >
        ${workout.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    
    `
  workoutList.appendChild(workoutItem)

}

_render(){
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
    this._displayProgressBar()
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


class App{
    constructor(){
        this._tracker = new trackCalorie()
        document.getElementById('meal-form').
        addEventListener('submit',this._newItem.bind(this,'meal'))

        document.getElementById('workout-form').
        addEventListener('submit',this._newItem.bind(this,'workout'))
    }


_newItem(type,e){
    e.preventDefault();
    const name = document.getElementById(`${type}-name`)
    const calories = document.getElementById(`${type}-calories`)
   if(name.value.trim() === '' ||  calories.value === ''){
    alert('Enter valid input')
    return
   }

   if(type === 'meal'){
    const meal = new Meal(name.value , Number(calories.value))
    this._tracker.addMeal(meal)
   }else{
    const workout = new Workout(name.value , Number(calories.value))
    this._tracker.addWorkout(workout)
   }
  
   name.value = '';
   calories.value = '';

   const collapseItem = document.getElementById(`collapse-${type}`)
   const bsCollapse = new bootstrap.Collapse(collapseItem,{
    toggle: true
   });
}  
 

}

const app = new App()