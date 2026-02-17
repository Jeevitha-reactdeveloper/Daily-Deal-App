import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters,setFilters] = useState({
        category : "",
        gender : "",
        color : "",
        size : [],
        material : [],
        brand : [],
        minPrice : 10,
        maxPrice : 100,
    });

    const [priceRange,setPriceRange] = useState([10,100]);

    const categories = ["Top Wear","Bottom Wear"];

    const colors = [
        "Red",
        "Blue",
        "Black",
        "Green",
        "White",
        "Gray",
        "Navy",
        "Pink"
    ];

    const sizes = ["XS","S","M","L","XL","XXL"];

    const materials = [
        "Cotton",
        "Wool",
        "Denim",
        "Silk",
        "Linen",
        "Viscose"
    ]

    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Allen Solly",
        "Peter England",
        "Fashion Studio",
        "Comfy Fit",
        "Elegance"
    ]

    const genders = ["Men","Women"];

    useEffect(() =>{
         const params = Object.fromEntries([...searchParams]);
         //  using the above statement we can convert the info or params to object 
         // {category : 'Top wear',maxPrice : 100} => params.category(is used to get values)
         setFilters({
            category : params.category || "",
            gender : params.gender || "",
            color : params.color || "",
            size : params.size ? params.size.split(",") : [],
            material : params.material ? params.material.split(",") : [],
            brand : params.brand ? params.brand.split(",") : [],
            minPrice : params.minPrice || 10,
            maxPrice : params.maxPrice || 100,
         });
         setPriceRange([0,params.maxPrice || 100])
    },[searchParams])

    const handleFilterChange = (e) =>{
        const {name,value,checked,type} = e.target;
        console.log({name,value,checked,type});
        let newFilters = {...filters};

        if(type === "checkbox"){
            if(checked){
                newFilters[name] = [...(newFilters[name] || []), value];
            }else{
                newFilters[name] = newFilters[name].filter((item) => item !== value );
            }
        }else{
            newFilters[name] = value;
        }
        setFilters(newFilters);
        updateUrlParams(newFilters)
        console.log(newFilters);
    }


    const updateUrlParams = (newFilters)=>{
        const params = new URLSearchParams();
        // {category : "Top wear",size : ["xs","s"]}
        Object.keys(newFilters).forEach((key) =>{
            if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
                params.append(key,newFilters[key].join(","));
            }else if (newFilters[key]){
                params.append(key,newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`); //valuse would look like this ?category=Bottom+Wear&size=XS%2CS
    }


    const handlePriceChange = (e) =>{
        const newPrice = e.target.value;
        setPriceRange([0,newPrice]);
        const newFilters = {...filters,minPrice: 0,maxPrice: newPrice}
        setFilters(newFilters);
        updateUrlParams(newFilters)

    }
  return (
    <div className='p-4 '>
        <h3 className='text-xl font-medium text-gray-800 mb-4 '>Filter</h3>
        {/* Category filter */}
        <div className='mb-6 '>
            <label className='block text-gray-600 font-medium mb-4'>Category</label>
            {categories.map((category) =>{
                return(
                    <div key={category} className='flex items-center mb-1'>
                        <input type='radio' 
                        checked ={filters.category === category }
                        value={category}
                        onChange={handleFilterChange}
                        name='category'
                         className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                        <span className='text-gray-800'>{category}</span>
                    </div>
                )

            })}
        </div>

        {/* gender filter */}
         <div className='mb-6 '>
            <label className='block text-gray-600 font-medium mb-4'>Gender</label>
            {genders.map((gender) =>{
                return(
                    <div key={gender} className='flex items-center mb-1'>
                        <input 
                        value={gender}
                        onChange={handleFilterChange}
                        checked = {filters.gender === gender}
                        type='radio'
                        name='gender' 
                        className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                        <span className='text-gray-800'>{gender}</span>
                    </div>
                )

            })}
        </div>
        {/* color filter */}
       {/*  <div className='mb-6 '>
            <label className='block text-gray-600  font-medium mb-2'>Color</label>
            <div className='flex flex-wrap gap-2 '>
                {colors.map((color) =>{
                    return(
                        <button
                        type='button'
                        value={color}
                        onClick={handleFilterChange}
                         key={color} 
                         name='color' 
                        className={`w-8 h-8 rounded-full border border-gray-300 
                        cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                        style={{backgroundColor : color.toLowerCase()}}></button>
                    )
                })}
            </div>
        </div> */}
        {colors.map((color) => (
  <label key={color} className="cursor-pointer">
    <input
      type="radio"
      name="color"
      value={color}
      checked={filters.color === color}
      onChange={handleFilterChange}
      className="hidden"
    />

    <span
      className={`w-8 h-8 inline-block rounded-full border 
      ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
      style={{ backgroundColor: color.toLowerCase() }}
    />
  </label>
))}

        {/* size filter */}
        <div className='mb-6 '>
            <label className='block text-gray-600 font-medium mb-2'>Size</label>
            {sizes.map((size) =>{
                return(
                    <div key={size} className='flex items-center mb-1'>
                        <input 
                        value={size}
                        onChange={handleFilterChange}
                        checked = {filters.size.includes(size)}
                        type='checkbox' 
                        name='size'
                         className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                         <span className='text-gray-700'>{size}</span>
                    </div>
                )
            })}
        </div>
        {/* Material filter */}
        <div className='mb-6 '>
            <label className='block text-gray-600 font-medium mb-2'>Material</label>
            {materials.map((material) =>{
                return(
                    <div key={material} className='flex items-center mb-1'>
                        <input 
                        value={material}
                        onChange={handleFilterChange}
                        checked = {filters.material.includes(material)}
                        type='checkbox'
                         name='material'
                         className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                         <span className='text-gray-700'>{material}</span>
                    </div>
                )
            })}
        </div>
        {/* Brand filter */}
        <div className='mb-6 '>
            <label className='block text-gray-600 font-medium mb-2'>Brand</label>
            {brands.map((brand) =>{
                return(
                    <div key={brand} className='flex items-center mb-1'>
                        <input 
                        value={brand}
                        onChange={handleFilterChange}
                        checked = {filters.brand.includes(brand)}
                        type='checkbox' name='brand'
                         className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                         <span className='text-gray-700'>{brand}</span>
                    </div>
                )
            })}
        </div>
        {/* Price range filter */}
        <div className='mb-8'>
            <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
            <input type='range' name='price range' 
            min={10} 
            max={100}
            value={priceRange[1]}
            onChange={handlePriceChange}
             className='w-full h-2 bg-gray-300 rounded-lg cursor-pointer'/>
             <div className='flex justify-between text-gray-600 mt-2'>
                <span>$10</span>
                <span>${priceRange[1]}</span>
             </div>
        </div>
    </div>
  )
}

export default FilterSidebar