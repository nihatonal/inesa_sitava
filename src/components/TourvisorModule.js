import React from "react";
import { useTourvisor } from "../hooks/useTourvisor";

const TourvisorModule = ({ moduleId, moduleType }) => {
    // Hook ile script yükleniyor ve initialize ediliyor
    useTourvisor(moduleId);

    // Modül div'i
    return <div className={`${moduleType} tv-moduleid-${moduleId}`}></div>;
};

export default TourvisorModule;
