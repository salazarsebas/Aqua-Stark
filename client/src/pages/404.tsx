import BackToHomeButton from "@/components/ui/back-to-home-button";

export default function Error404Page() {
  return (
    <div className="h-screen relative text-white">
      <div className="flex flex-col items-center justify-center font-404 h-screen bg-blue-500">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>Oops! You swam too far from the reef.</p>
        <BackToHomeButton />
      </div>
      <img
        src="/background-decorations/wave-decoration.svg"
        className="fixed bottom-0 left-0"
      />
    </div>
  );
}
