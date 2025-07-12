import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-20">
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
    </main>
  );
}
