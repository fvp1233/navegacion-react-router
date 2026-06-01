import React from "react";
 
import DataTestForm from "../components/DataTestForm";
import DataTestList from "../components/DataTestList";
import useDataTest from "../hooks/useDataTest";
 
const Contact = () => {
  const {
    activeTab,
    setActiveTab,
    dataTest,
    loading,
    submitting,
    error,
    message,
    id,
    name,
    setName,
    age,
    setAge,
    openCreateForm,
    handleEdit,
    handleSubmit,
    handleDelete,
  } = useDataTest();
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-xl shadow-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
            Data Test CRUD
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Contact ahora funciona como CRUD para la API remota
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
            Puedes crear, editar, eliminar y volver a cargar los registros con
            nombre y edad desde la API de Retool.
          </p>
 
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "list"
                  ? "bg-white text-slate-900"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              Ver lista
            </button>
            <button
              type="button"
              onClick={openCreateForm}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "form"
                  ? "bg-white text-slate-900"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              Nuevo registro
            </button>
          </div>
        </header>
 
        {activeTab === "form" ? (
          <DataTestForm
            id={id}
            name={name}
            setName={setName}
            age={age}
            setAge={setAge}
            onSubmit={handleSubmit}
            onCancel={() => setActiveTab("list")}
            submitting={submitting}
            error={error}
            message={message}
          />
        ) : (
          <DataTestList
            dataTest={dataTest}
            loading={loading}
            error={error}
            onAdd={openCreateForm}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};
 
export default Contact;