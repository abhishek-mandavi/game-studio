"use client"
import { ChatComposer } from "@/components/chat-composer"
import { Button } from "@/components/ui/button"
import {
    DEFAULT_GAME_MODEL_ID,
    type GameModelId,
} from "@/lib/games/model-catalog"
import { suggestions } from "@/lib/games/suggestions"
import { useState, useTransition } from "react"

export function NewGameComposer() {
    const [prompt, setPrompt] = useState("")
    const [modelId, setModelId] = useState<GameModelId>(DEFAULT_GAME_MODEL_ID)
    const [isPending, startTransition] = useTransition()

    function handleSubmit(value: string) {
        startTransition(async () => {

        })
    }

    function handleSuggestion(suggestionPrompt: string) {
        // Into the box as well as into the action: on the happy path the redirect
        // means nobody sees it, but if the create fails the player is left looking
        // at the prompt that failed rather than an empty composer — the same
        // bargain the typed path already makes.
        setPrompt(suggestionPrompt)
        handleSubmit(suggestionPrompt)
    }

    return (
        <>
            <ChatComposer
                value={prompt}
                onValueChange={setPrompt}
                onSubmit={handleSubmit}
                modelId={modelId}
                onModelChange={setModelId}
                disabled={isPending}
            />
            <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((suggestion) => (
                    <Button 
                        key={suggestion.label}
                        variant="outline"
                        size="sm"
                        className="rounded-full font-normal text-muted-foreground"
                        disabled={isPending}
                        onClick={() => handleSuggestion(suggestion.prompt)}
                    >
                        <suggestion.icon />
                        {suggestion.label}
                    </Button>
                ))}
            </div>
        </>
    )
}