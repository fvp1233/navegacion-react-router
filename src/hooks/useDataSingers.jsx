import { useEffect, useState } from "react";

const API_URL = "https://retoolapi.dev/f1D0Zs/dataGrupo2A";

const useDataSingers = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [dataSingers, setDataSingers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [id, setId] = useState("");
  const [cancion, setCancion] = useState("");
  const [cantante, setCantante] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");

  const fetchDataSingers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("No se pudo obtener la informacion");
      }

      const data = await response.json();
      console.log(data);
      setDataSingers(data);
    } catch (fetchError) {
      setError(fetchError.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSingers();
  }, []);

  const resetForm = () => {
    setId("");
    setCantante("");
    setCancion("");
    setNacionalidad("");
  };

  const openCreateForm = () => {
    resetForm();
    setMessage("");
    setActiveTab("form");
  };

  const handleEdit = (item) => {
    setId(item.id);
    setCantante(item.cantante);
    setCancion(item.cancion);
    setNacionalidad(item.nacionalidad);
    setMessage("");
    setActiveTab("form");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedSinger = cantante.trim();
    const trimmedSong = cancion.trim();
    const trimmedNacionality = nacionalidad.trim();

    if (!trimmedSinger) {
      setError("El nombre del cantante es obligatorio");
      return;
    }
    if (!trimmedSong) {
      setError("El nombre de la canción es obligatorio");
      return;
    }
    if (!trimmedNacionality) {
      setError("La nacionalidad del cantante es obligatorio");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const payload = {
        cancion: trimmedSong,
        cantante: trimmedSinger,
        nacionalidad: trimmedNacionality,
      };

      console.log("prueba")
      const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(id ? "No se pudo actualizar" : "No se pudo crear");
      }

      setMessage(
        id
          ? "Registro actualizado correctamente"
          : "Registro creado correctamente"
      );

      resetForm();
      setActiveTab("list");
      fetchDataSingers();
    } catch (submitError) {
      setError(submitError.message || "Error al guardar el registro");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (itemId) => {
    const shouldDelete =
      typeof window === "undefined"
        ? true
        : window.confirm("¿Deseas eliminar este registro?");
    if (!shouldDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el registro");
      }

      setMessage("Registro eliminado correctamente");
      await fetchDataTest();

      if (String(id) === String(itemId)) {
        resetForm();
        setActiveTab("list");
      }
    } catch (deleteError) {
      setError(deleteError.message || "Error al eliminar el registro");
    }
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    submitting,
    error,
    message,
    fetchDataSingers,
    dataSingers,
    cantante,
    setCantante,
    cancion,
    setCancion,
    nacionalidad,
    setNacionalidad,
    openCreateForm,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};
export default useDataSingers;
