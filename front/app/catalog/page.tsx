"use client";

import PhotoGrid from "@/modules/photos/components/Grid";
import UploadPhoto from "@/modules/photos/components/Upload";
import MainLayout from "@/modules/site/componets/MainLayout";

const CatalogPage: React.FC = () => {
  return (
    <MainLayout>
      <UploadPhoto />
      <PhotoGrid  />
    </MainLayout>
  );
};

export default CatalogPage;
