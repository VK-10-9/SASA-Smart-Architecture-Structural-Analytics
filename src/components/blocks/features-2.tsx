"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export function Features() {
    return (
        <section className="py-16 md:py-32">
            <div className="container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-white">Built to cover your needs</h2>
                    <p className="mt-4 text-white/70">Smart tools for structural analysis and architectural design.</p>
                </div>
                <div className="mx-auto mt-8 grid max-w-sm gap-6 md:max-w-none md:grid-cols-3 md:mt-16">
                    <Card className="group border-0 bg-white/5 shadow-none backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="h-6 w-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Design Scenario</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-white/70">Create and analyze various architectural scenarios with our intuitive design tools.</p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-white/5 shadow-none backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings2 className="h-6 w-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Force Calculator</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-white/70">Precise structural force calculations for your architectural designs.</p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-white/5 shadow-none backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles className="h-6 w-6 text-white" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-white">Smart Analytics</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-white/70">AI-powered analysis tools to optimize your structural designs.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div aria-hidden className="relative mx-auto h-36 w-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="absolute inset-0 [--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10"/>
        <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center border-t border-l border-white/20">{children}</div>
    </div>
)
