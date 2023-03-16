import Storage from "./Storage";

class TrackCalorie{
    constructor(){
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories()
        this._meals = Storage.getMeals()
        this._workouts = Storage.getWorkouts()
      
        this._displayCaloriesLimit()
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayProgressBar()

        document.getElementById('limit').value = this._calorieLimit;
    }

// Public Methods

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalories += meal.calories
        Storage.setTotalCalories(this._totalCalories)
        Storage.saveMeal(meal)
        this._displayNewMeal(meal)
        this._render()
    }

    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -= workout.calories
        Storage.setTotalCalories(this._totalCalories)
        Storage.saveWorkout(workout)
        this._displayNewWorkout(workout)
        this._render()
    }


    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);
    
        if (index !== -1) {
          const meal = this._meals[index];
          this._totalCalories -= meal.calories;
          Storage.setTotalCalories(this._totalCalories)
          this._meals.splice(index, 1);
          Storage.removeMeal(id)
          this._render();
        }
      }
    
      removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);
    
        if (index !== -1) {
          const workout = this._workouts[index];
          this._totalCalories += workout.calories;
          Storage.setTotalCalories(this._totalCalories)    
          this._workouts.splice(index, 1);
          Storage.removeWorkout(id)
          this._render();
        }
      }

      reset(){
       
        this._totalCalories = 0
        this._meals =[]
        this._workouts =[]
        Storage.reset()
        this._render()
      }


      setLimit(calorieLimit){
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit)
        this._displayCaloriesLimit()
        this._render()
      }
    

      loadItems(){
        this._meals.forEach(meal => this._displayNewMeal(meal))
        this._workouts.forEach(workout => this._displayNewWorkout(workout))
      }
    
//Private Methods

_displayCaloriesTotal(){
  const totalCaloriesEl = document.getElementById('calories-total')
  totalCaloriesEl.innerHTML = this._totalCalories;
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
    const remaining = this._calorieLimit - this._totalCalories
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
    const progress = (this._totalCalories / this._calorieLimit)* 100
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
      <button class="delete btn btn-sm mx-2">
      <i class="ri-close-fill"></i>
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
      <button class="delete btn  btn-sm mx-2">
      <i class="ri-close-fill"></i>
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

export default TrackCalorie;