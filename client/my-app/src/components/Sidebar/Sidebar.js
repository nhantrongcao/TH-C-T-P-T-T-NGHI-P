import React,{useState,useEffect} from "react";
import "./Sidebar.css";
import {apiGetCategories} from '../../apis/app'
import { NavLink } from "react-router-dom";
import {createSlug} from '../../ultils/helper'

const Sidebar = () => {
    const [categories,setCategories]=useState(null)
    const fetchCCategories =async () => {
        const response =await apiGetCategories()

        if(response.success) setCategories(response.productCategories)
    }
    useEffect(()=>{
        fetchCCategories()
    },[])

    return (
        <div className="sidebar">
        <h3 className="sidebar-title">Danh mục sản phẩm</h3>
        {categories?.map(el=>(
            <NavLink             
             key={createSlug(el.title)}
            to={createSlug(el.title)}>

                {el.title}
            </NavLink>
        ))}
        </div>
    )
   
};

export default Sidebar