'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, Twitter, Github, Linkedin, Moon, Sun, Sparkles, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn as cnf } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import translations
import en from '@/locales/en.json'
import hi from '@/locales/hi.json'
import kn from '@/locales/kn.json'
import cn from '@/locales/cn.json'
import es from '@/locales/es.json'
import jn from '@/locales/jn.json'
import po from '@/locales/po.json'
import ko from '@/locales/ko.json'
import tl from '@/locales/tl.json'
import tm from '@/locales/tm.json'

const translations = { en, hi, kn, cn, es, jn, po, ko, tl, tm }

type Lang = 'en' | 'hi' | 'kn' | 'cn' | 'es' | 'jn' | 'ko' | 'po' | 'tl' | 'tm';

const languageNames: Record<Lang, string> = {
  en: 'English',
  hi: 'हिंदी',
  kn: 'ಕನ್ನಡ',
  cn: '中文',
  es: 'Español',
  jn: '日本語',
  po: 'Português',
  ko: '한국어',
  tl: 'తెలుగు',
  tm: 'தமிழ்'
}

const avatars = [
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/6.x/adventurer/svg?seed=Milo',
]

export default function Resume({ params }: { params: { lang: Lang } }) {
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState(0)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const t = translations[params.lang]

  useEffect(() => {
    setTimeout(() => setLoading(false), 0)
    const avatarIntervalId = setInterval(() => {
      setCurrentAvatar((prev) => (prev + 1) % avatars.length)
    }, 5000) // Change avatar every 5 seconds
    return () => {
      clearInterval(avatarIntervalId)
    }
  }, [])

  const handleLanguageChange = (lang: Lang) => {
    router.push(`/${lang}`)
  }

  const SkeletonCard = () => (
    <Card className="border-none shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-1/4 mb-4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-900 p-4 sm:p-8 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <motion.div 
          className="sticky top-0 bg-background/80 backdrop-blur-sm shadow-sm p-4 z-20 rounded-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden dark:text-white">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {(Object.keys(translations) as Lang[]).map((lang) => (
                  <DropdownMenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden sm:flex flex-wrap gap-2">
              {(Object.keys(translations) as Lang[]).map((lang) => (
                <motion.div key={lang} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => handleLanguageChange(lang)} 
                    variant={params.lang === lang ? 'default' : 'outline'}
                    size="sm"
                    className={cnf('dark:text-slate-100', params.lang === lang && 'dark:text-black')}
                  >
                    {languageNames[lang]}
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className='dark:text-white'
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={avatars[currentAvatar]} alt="Profile picture" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
              </motion.div>
              <CardTitle className="text-3xl sm:text-4xl font-bold flex items-center justify-center">
                {loading ? <Skeleton className="h-10 w-3/4 mx-auto" /> : (
                  <>
                    {t.name}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="ml-2"
                    >
                      <Sparkles className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                  </>
                )}
              </CardTitle>
              <div className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0 sm:space-x-2">
                {loading ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <Link href="mailto:sarvagyakrcs@gmail.com" className="hover:underline block sm:inline">sarvagyakrcs@gmail.com</Link>
                    <span className="hidden sm:inline">•</span>
                    <Link href="https://twitter.com/kumar_sarvagya" className="hover:underline block sm:inline">@kumar_sarvagya</Link>
                  </>
                )}
              </div>
              {loading ? (
                <Skeleton className="h-4 w-1/2 mx-auto" />
              ) : (
                <>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t.education}</p>
                  <motion.p 
                    className="text-xs sm:text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t.motto}
                  </motion.p>
                </>
              )}
            </CardHeader>
          </Card>
        </motion.div>

        {loading ? (
          <SkeletonCard />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{t.about_me}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  {t.about_me_points.map((point: string, index: number) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {loading ? (
          <SkeletonCard />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{t.key_competencies}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">{t.proficient_full_stack}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t.full_stack_description}</p>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                    {t.competencies.map((competency: string, index: number) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {competency}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {loading ? (
          <SkeletonCard />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{t.professional_experience}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {t.experiences.map((exp: { title: string; date: string; description: string }, index: number) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-sm sm:text-base">{exp.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{exp.date}</p>
                    <p className="text-xs sm:text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {loading ? (
            <SkeletonCard />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{t.education_certifications}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {t.education_items.map((item: { title: string; institution: string }, index: number) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <p className="font-semibold text-sm sm:text-base">{item.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.institution}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {loading ? (
            <SkeletonCard />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{t.extracurricular_activities}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-sm sm:text-base">{t.conference_title}</p>
                  <p className="text-xs sm:text-sm">{t.conference_description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => setContactOpen(true)} 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
          >
            {t.contact_me}
          </Button>
        </motion.div>

        <AnimatePresence>
          {contactOpen && (
            <motion.div 
              className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-full max-w-md"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t.contact_me}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                      <Phone className="w-5 h-5" />
                      <span className="text-sm">+91-8279959965</span>
                    </motion.div>
                    <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">sarvagyakrcs@gmail.com</span>
                    </motion.div>
                    <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                      <Twitter className="w-5 h-5" />
                      <span className="text-sm">@kumar_sarvagya</span>
                    </motion.div>
                    <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                      <Github className="w-5 h-5" />
                      <span className="text-sm">github.com/sarvagyakrcs</span>
                    </motion.div>
                    <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">linkedin.com/in/sarvagyakumar</span>
                    </motion.div>
                    <Button onClick={() => setContactOpen(false)} className="w-full">
                      {t.close}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}