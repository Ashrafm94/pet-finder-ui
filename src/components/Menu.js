import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_VIEW, SET_FILTERED_PETS } from "../redux/actions/pets";

const Menu = () => {

    const menuItems = [
        {title: "All", type: null},
        { title: "Cats", type: "cat" },
        { title: "Dogs", type: "dog" }
    ];

    const [activeMenuType, setActiveMenuType] = useState(menuItems[0].type);
    const dispatch = useDispatch();
    const pets = useSelector(state => state.petsReducer.pets);
 

    const menuItemClicked = (type) => {
        setActiveMenuType(type);

        let menu = menuItems.find(item => item.type === type);
        let selectedType = menu ? menu : { title: "All", type: null };

        let filtered;

        if (selectedType === "All") {
            filtered = pets;
        } else {
            filtered = pets.filter(item => item.type === type);
        }

        dispatch({ type: SET_ACTIVE_VIEW, selectedType })
        dispatch({ type: SET_FILTERED_PETS, pets: filtered})
    }

    return (
        <Container style={{ marginTop: 10 }}>
            <div className="navbar-container">
                <ul>
                    {menuItems.map(item => 
                        <li className={`${activeMenuType === item.type ? "active": ""}`} 
                            key={item.type} 
                            onClick={() => menuItemClicked(item.type)}>{item.title}</li>
                    )}
                </ul>
            </div>
        </Container>

    )
}

export default Menu;