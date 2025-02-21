'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { User, Mail, Bell, Shield, Palette, HelpCircle, PlusIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/app/components/ui/tooltip'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const [tooltipOpen, setTooltipOpen] = useState(false)

  const [imageUrl, setImageUrl] = useState<string>("/api/placeholder/32/32")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log(file)
    console.log('file upload started....')
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-8">
      <div className="flex gap-8">
        <div className="flex-1 bg-white rounded-2xl p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-bookly-cream">
              <div className="relative">
                <Avatar className='h-28 w-28'>
                  <AvatarImage src={imageUrl} className='h-28 w-28'
                    alt="Profile picture" />
                  <AvatarFallback>KA</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        handlePlusClick();
                        setTooltipOpen(false)
                      }}
                      className="absolute bottom-0 right-0 p-2 bg-bookly-orange text-white rounded-full hover:bg-bookly-orange/90"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side='right' align='end' alignOffset={-10} className='text-bookly-brown'>
                    <p>Upload profile picture</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div>
                <h3 className="font-medium text-bookly-brown">Profile Photo</h3>
                <p className="text-sm text-gray-500">Update your profile photo</p>
              </div>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 text-bookly-textInput border border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bookly-brown mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full text-bookly-textInput p-2 border border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bookly-brown mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full text-bookly-textInput p-2 border border-bookly-cream rounded-lg focus:outline-none focus:border-bookly-orange"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bookly-brown mb-1">
                  Bio
                </label>
                <textarea
                  className="w-full text-bookly-textInput p-2 border border-bookly-cream rounded-lg h-32 resize-none focus:outline-none focus:border-bookly-orange"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-bookly-orange text-white rounded-lg hover:bg-bookly-orange/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage