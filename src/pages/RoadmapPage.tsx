import { useLocation, useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Roadmap from "../components/Roadmap/Roadmap";
import { data as frontendData } from "../roadmaps/frontend";
import { data as reactData } from "../roadmaps/react";
import { data as backendData } from "../roadmaps/backend";
import { data as devopsData } from "../roadmaps/devops";
import { data as communityData } from "../roadmaps/community";
import E404Page from "./E404Page";
import useDocumentTitle from "../components/useDocumentTitle";
import { useEffect, useRef, useState } from "react";
import { dataEngineeringData } from "../roadmaps/dataEngineering";

export default function RoadmapPage() {
  const { name } = useParams<string>();
  const [roadmapName, setRoadmapName] = useState('');

  const roadmaps: any = {
    frontend: { file: frontendData, title: "Frontend" },
    react: { file: reactData, title: "React" },
    backend: { file: backendData, title: "Backend" },
    devops: { file: devopsData, title: "Devops" },
    dataEngineer: { file: dataEngineeringData, title: "Data Engineer" },
    community: { file: communityData, title: "Comunidade" },
  };

  useEffect(() => {
    setRoadmapName(name || '');
  }, [name]);
  

  useDocumentTitle("Trilha Info - " + roadmaps[name || ""].title);

  return (
    <>
      <MainLayout>
        <p className="mt-4 text-center font-semibold c-brown md:px-10">
          Não sabe por onde começar a estudar? Que tal dar uma olhada por aqui?
        </p>
        <p className="mb-4 text-center font-semibold c-brown md:px-28">
          Lendo de cima pra baixo, cada "caixa" é um assunto a ser estudado.
          Clicando, você verá em mais detalhes o que estudar com links de
          conteúdos gratuitos produzidos por pessoas que dominam a área e te
          ajudarão nessa jornada!
        </p>

        {name && roadmaps[name] && (
          <Roadmap isPreview={false} data={roadmaps[name].file} title={roadmaps[name].title} name={roadmapName} />
        )}
        {!name || (!roadmaps[name] && <E404Page />)}
      </MainLayout>
    </>
  );
}
