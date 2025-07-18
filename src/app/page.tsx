'use client'

import { Button, Checkbox, Input, Tab, Tabs } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

type ChecklistItem = {
  item: string;
  checked: boolean;
}

export default function Home() {
  const {
    start,
    pause,
    reset,
    hours,
    minutes,
    seconds,
    isRunning
  } = useStopwatch({ autoStart: false })
  const [list, setList] = useState<{ [key: string]: ChecklistItem }>({});
  const [newItem, setNewItem] = useState<string>('');
  
  const generateAlphanumericHash = useCallback(
    (length: number = 5) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let hash = '';
      for (let i = 0; i < length; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return hash;
    },
    []
  )

  useEffect(() => { setList(JSON.parse(localStorage.getItem('list') || '{}')); }, []);

  useEffect(() => { localStorage.setItem('list', JSON.stringify(list)); }, [list])

  return (
    <div className="h-full w-full">
      <section className="h-full flex flex-col bg-[#312F51] text-[#99AAB5]">
        <header className="flex justify-center p-4">
          <h1 className="text-6xl">Checklist With Timer</h1>
        </header>
        <main className="p-10 px-16 grow">
          <Tabs
            defaultSelectedKey="checklist"
            isVertical
            classNames={{
              tabList: 'bg-[#6253E92B]',
              tabContent: 'text-white group-data-[selected=true]:text-[#99AAB5]',
              cursor: 'bg-[#312F51]',
              tabWrapper: 'h-full'
            }}
          >
            <Tab className="w-full bg-[#6253E92B] flex flex-col items-center" key="checklist" title="Lista">
              <ul className="w-full flex flex-col items-center">
                {
                  Object.entries(list).map(([id, checklistItem]) => (
                    <li key={`${id}-item`} className="flex w-[50%] justify-between items-center">
                      <Checkbox
                        color="secondary"
                        classNames={{ label: "text-white" }}
                        isSelected={list[id].checked}
                        onValueChange={(isSelected) => {
                          setList((previousList) => {
                            if (Object.values(previousList).every((item) => !item.checked) && isSelected) {
                              console.log('Inicia');
                              
                              start();
                            }
                            if (Object.values(list).every((item) => item.checked)) {
                              console.log('Pausa');
                              
                              pause();
                            }
                            previousList[id].checked = isSelected
                            return {...previousList};
                          });
                        }}
                      >
                        {checklistItem.item}
                      </Checkbox>
                      <Button
                        onPress={() => {
                          reset(undefined, false);
                          setList((previousList) => {
                            const  { [id]: _, ...newValues } = previousList
                            return {...newValues };
                          });
                        }}
                      >
                        Remover item
                      </Button>
                    </li>
                  ))
                }
              </ul>
              <Button
                className="disabled"
                color="secondary"
                isDisabled={Object.values(list).length === 0 || Object.values(list).some((item) => !item.checked)}
                onPress={() => {
                  console.log('Pausou e resetou');
                  reset(undefined, false);
                  setList((previousList) => {
                    return Object
                      .entries(previousList)
                      .reduce(
                        (acc: { [key: string]: ChecklistItem }, [id, { item }]) => {
                          acc[id] = { item , checked: false }
                          return acc;
                        },
                        {},
                      )
                  });
                }}
              >
                Reiniciar lista
              </Button>
            </Tab>
            <Tab className="w-full bg-[#6253E92B]" key="add-items" title="Adicionar itens">
              <form
                className="h-full w-full flex flex-col items-center justify-center gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const listItemsIds = Object.keys(list);
                  let hash ='';

                  do {
                    hash = generateAlphanumericHash(10);
                  } while(listItemsIds.includes(hash))

                  setList((previousList) => ({...previousList, [hash]: { item: newItem, checked: false }}));
                  setNewItem('');
                }}
              >
                <Input
                  className="max-w-[50%]"
                  label="Novo item"
                  value={newItem}
                  onValueChange={(newValue) => setNewItem(newValue)}
                />
                <Button color="secondary" type="submit">Adicionar</Button>
              </form>
            </Tab>
          </Tabs>
        </main>
        <footer className="flex items-center justify-center p-4">
          <p className="text-white text-6xl">{`${hours < 10 ? '0' + hours: hours}:${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds: seconds}`}</p>
        </footer>
      </section>
      {/* <main className="min-h-screen flex flex-col items-center justify-center gap-20">
        <h1>Follow UP Helper</h1>
        <section className="flex flex-wrap min-w-screen items-center justify-around">
          <section className="flex flex-col gap-6">
            <div>
              <input type="checkbox" id="primeiroPasso" />
              <label htmlFor="primeiroPasso">Passo 1</label>
            </div>
            <div>
              <input type="checkbox" id="segundoPasso" />
              <label htmlFor="segundoPasso">Passo 2</label>
            </div>
            <div>
              <input type="checkbox" id="terceiroPasso" />
              <label htmlFor="terceiroPasso">Passo 3</label>
            </div>
            <div>
              <input type="checkbox" id="quartoPasso" />
              <label htmlFor="quartoPasso">Passo 4</label>
            </div>
          </section>
          <section>
            <h2>Temporizador</h2>
          </section>
        </section>
      </main> */}
    </div>
  );
}
