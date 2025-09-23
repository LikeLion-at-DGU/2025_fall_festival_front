import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dirvana from "../../assets/images/icons/logo/dirvanablacksmall.png";

export default function NotFound({ message = null }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] px-4">
      <img src={dirvana} alt="dirvana" className="w-[200px] h-auto mb-10 opacity-50" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {t("common.notFound")}
      </h2>
      <p className="text-gray-600 text-center mb-8">
        {message || t("common.notFoundDescription")}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
      >
        {t("common.goBack")}
      </button>
    </div>
  );
}
