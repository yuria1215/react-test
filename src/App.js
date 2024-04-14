import React, { useState } from 'react';
import './css/App.css';
import AgeGroupPriceList from './components/AgeGroupPriceList/AgeGroupPriceList.js';

function App() {
    const handlePriceListChange = (result) => {
        // 檢查每個元素是否都有 ageGroup 和 price，且 price 是數字
        const isValidResult = result.every(item =>
            item.ageGroup[0] !== '' &&
            item.price !== '' &&
            !isNaN(parseFloat(item.price))
        );

        // 如果所有結果都符合條件，則打印結果
        if (isValidResult) {
            console.log(result);
        }
    };


    return (
        <div className="App">
            <div className="test">
                {/* 將 onChange 處理函數傳遞給 AgeGroupPriceList */}
                {/* <AgeGroupPriceList onChange={handlePriceListChange} /> */}
                {/* 每次 price onChange會再次log,
                因此這邊先採取 "Log Result Button"手動方式, 待資料都輸入完畢後再印log */}

                <AgeGroupPriceList />

            </div>
        </div>
    );
}

export default App;
