import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { findAllAnimals } from "../API/requests";
import { SET_AGES, SET_FILTERED_PETS, SET_PETS } from "../redux/actions/pets";
import FilterSection from "./FilterSection";
import Pet from "./Pet";
import { InfinitySpin } from 'react-loader-spinner'

const Pets = () => {

    const pets = useSelector(state => state.petsReducer.pets);
    const filteredPets = useSelector(state => state.petsReducer.filteredPets);
    const ages = useSelector(state => state.petsReducer.ages);
    const selectedType = useSelector(state => state.petsReducer.selectedType);

    const [selectedAge, setSelectedAge] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        //Load Pets From API and Save them Into Redux Store
        loadPets();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

    }, [filteredPets, selectedType])

    useEffect(() => {
        setSelectedAge("");
    }, [selectedType]);

    const loadPets = async () => {
        let pets = await findAllAnimals();

        if (pets === null) {
            pets = [];
        }

        const ages = getAges(pets);

        updateStore(pets, ages);
        setIsLoading(false);
    }

    const getAges = (pets) => {
        const ages = [];

        pets.forEach(pet => {
            if (!ages.includes(pet.age)) {
                ages.push(pet.age);
            }
        })

        return ages;
    }

    const updateStore = (pets, ages) => {
        //Save In Reducx Store
        dispatch({ type: SET_PETS, pets })
        dispatch({ type: SET_FILTERED_PETS, pets })
        dispatch({ type: SET_AGES, ages })
    }

    const onChangeAge = (age) => {
        //If type is null then --> All
        setSelectedAge(age);
        if (!selectedType?.type) {
            filterAllPetsByAge(age)
        } else {
            filterByTypeAndAge(age)
        }
    }

    const filterAllPetsByAge = (age) => {
        let filtered;

        if (age.length === 0) {
            filtered = pets;
        } else {
            filtered = pets.filter(item => item.age === age);
        }

        saveFilterResult(filtered)
    }

    const filterByTypeAndAge = (age) => {
        let filtered;
        if (age.length === 0) {
            filtered = pets.filter(item => item.type === selectedType?.type);
        } else {
            filtered = pets.filter(item => item.age === age && item.type === selectedType?.type);
        }

        saveFilterResult(filtered)
    }

    const saveFilterResult = (pets) => {
        dispatch({ type: SET_FILTERED_PETS, pets })
    }

    const LoadingSection = () => {
        return (
            <div className="center">
                <InfinitySpin
                    height="180"
                    width="180"
                    radius="9"
                    color="#f072a4"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        )
    }

    const PetsSection = () => {
        return (
            filteredPets?.map(item => <Col key={item.id} lg={3} md={6} sm={12} style={{ gap: "2rem" }}>
                <Pet pet={item} key={item.id} />
            </Col>
            )
        )
    }

    return (
        <Container style={{ marginTop: 10, marginBottom: 10 }}>
            <Row style={{ marginTop: 20 }}>
                <Col lg={3} md={6} sm={12} style={{ marginBottom: 10 }}>
                    <FilterSection title="Age" options={ages} value={selectedAge} onChange={onChangeAge} />
                </Col>
            </Row>

            <div className="pets-title-container">
                <label className="pets-title">{selectedType?.title}</label>
            </div>

            <Row style={{ marginTop: 20 }}>
                {isLoading ? <LoadingSection /> : <PetsSection />}
            </Row>
        </Container>
    )
}

export default Pets;