
import { SET_PETS, CLEAR_PETS, SET_AGES, SET_ACTIVE_VIEW, SET_FILTERED_PETS } from '../actions/pets';

const initState = {
    pets: [],
    filteredPets: [],
    ages: [],
    selectedType: {
        type: null ,
        title: "All"
    }
};

const petsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PETS:
            return {
                ...state,
                pets: action.pets
            }
        case SET_FILTERED_PETS:
            return {
                ...state,
                filteredPets: action.pets
            }

        case CLEAR_PETS:
            return {
                ...state,
                pets: []
            }
        case SET_AGES:
            return {
                ...state,
                ages: action.ages
            }
        case SET_ACTIVE_VIEW:
            return {
                ...state,
                selectedType: action.selectedType
            }

        default:
            return state;
    }
}

export default petsReducer;