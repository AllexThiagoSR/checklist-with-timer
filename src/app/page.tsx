'use client'
import { Tab, Tabs } from "@heroui/react";

export default function Home() {
  return (
    <section className="h-full flex flex-col">
      <header className="flex justify-center p-4">
        <h1 className="text-6xl">Checklist With Timer</h1>
      </header>
      <main className="p-10 grow">
        <Tabs defaultSelectedKey="checklist" isVertical>
          <Tab className="w-full h-full" key="checklist" title="Checklist"></Tab>
          <Tab key="add-items" title="Add">Add</Tab>
        </Tabs>
      </main>
    </section>
  );
}
