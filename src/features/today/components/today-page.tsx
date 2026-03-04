import {
  AlertTriangle,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Sparkles,
  Thermometer,
  Users,
  WifiOff,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const ListingThumb = ({ src, alt }: { src: string; alt: string }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="h-14 w-14 rounded-xl object-cover sm:h-16 sm:w-16 md:h-20 md:w-20 md:rounded-2xl" />;
};

const ApprovalCard = ({
  image,
  title,
  leftTag,
  rightTag,
  score,
  request,
  summary,
}: {
  image: string;
  title: string;
  leftTag: string;
  rightTag: string;
  score: string;
  request: string;
  summary: string;
}) => (
  <Card className="gap-0 rounded-2xl border border-[#e7ecf4] bg-white py-0 shadow-none">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={image} alt={title} className="h-[104px] w-full rounded-t-2xl object-cover sm:h-[112px]" />
    <CardContent className="space-y-3 p-4">
      <div className="flex items-start justify-between">
        <h4 className="text-base leading-tight font-semibold text-[#0b1a36] sm:text-lg">{title}</h4>
        <Badge className="h-6 rounded-full border-0 bg-[#e6f8f6] px-2.5 text-[11px] font-medium text-[#6e839a] sm:h-7 sm:px-3 sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#13b8a9]" />
          {score}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full border border-[#c8bfec] bg-[#ede8fb] px-2.5 py-1 text-[11px] font-semibold text-[#8a75cb] sm:px-3 sm:text-xs">
          {leftTag}
        </Badge>
        <Badge className="rounded-full border border-[#eac071] bg-[#fff1d9] px-2.5 py-1 text-[11px] font-semibold text-[#da9c00] sm:px-3 sm:text-xs">
          {rightTag}
        </Badge>
      </div>
      <p className="text-sm leading-tight font-semibold text-[#0f203f] sm:text-base">{request}</p>
      <p className="text-xs leading-tight text-[#6a7f99] sm:text-sm">{summary}</p>
      <div className="flex items-center gap-3 pt-1">
        <Button className="h-9 flex-1 rounded-full bg-[#18b9ab] text-sm font-semibold text-white hover:bg-[#16a99c] sm:h-11 sm:text-base">
          <Check className="h-4 w-4" />
          Approve
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-[#dbe3ef] sm:h-11 sm:w-11">
          <MessageCircle className="h-4 w-4 text-[#5f718a] sm:h-5 sm:w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-[#6a7f99] hover:bg-[#eff3f8] sm:h-10 sm:w-10">
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const TodayPage = () => (
  <div className="pb-2">
    <div className="mx-auto w-full max-w-[1400px] space-y-6 pb-7 md:space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.16)] text-foreground">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="flex flex-col py-1 justify-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#03163a] md:text-3xl">Today</h1>
          </div>
        </div>
      </div>

      <Card className="gap-0 rounded-2xl border border-[#a6e4de] bg-[#effaf9] py-0 shadow-none">
        <CardContent className="flex flex-col items-start justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:flex-row lg:gap-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1cbcb1] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <h2 className="text-lg font-semibold text-[#1a2638]">AI Daily Briefing</h2>
              <p className="text-sm text-[#2e3f54] sm:text-base">
                Good morning! You have <span className="font-semibold text-[#10b5a9]">2 check-ins</span> in the next 48
                hours and <span className="font-semibold text-[#e3a000]">2 approvals</span> waiting.
                <span className="font-semibold text-[#f04f52]"> ⚠ 2 devices need attention.</span>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-[#97ddd7] bg-[#dff6f2] px-3 py-1 text-xs font-semibold text-[#0caea1] sm:px-4 sm:text-xs">
                  3 Properties Active
                </Badge>
                <Badge className="rounded-full border border-[#97ddd7] bg-[#dff6f2] px-3 py-1 text-xs font-semibold text-[#0caea1] sm:px-4 sm:text-xs">
                  3 Tasks Today
                </Badge>
                <Badge className="rounded-full border border-[#f4b8ba] bg-[#ffe8e9] px-3 py-1 text-xs font-semibold text-[#f04f52] sm:px-4 sm:text-xs">
                  2 Critical Alerts
                </Badge>
                <Badge className="rounded-full border border-[#d8c8fa] bg-[#f2ecff] px-3 py-1 text-xs font-semibold text-[#7f5cf1] sm:px-4 sm:text-xs">
                  No Guest Risks
                </Badge>
              </div>
            </div>
          </div>
          <span className="text-sm text-[#6a7f99]">Wednesday, Mar 4</span>
        </CardContent>
      </Card>

      <Card className="gap-0 rounded-2xl border border-[#e7ecf4] bg-white py-0 shadow-none">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffb03a] via-[#fb8500] to-[#e85d04] text-white shadow-[#fb8500]/30">
                  <WifiOff className="h-4 w-4 drop-shadow-sm" />
                </div>
                <h2 className="text-lg font-semibold text-[#11213f]">Device Hub Alerts</h2>
              </div>
              <div className="flex items-center gap-2 pl-1.5 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-[#f04f52] bg-[#f04f52]/10 px-2.5 py-1 rounded-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f04f52] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f04f52]"></span>
                  </span>
                  2 critical
                </div>
                <div className="flex items-center gap-1.5 text-[#d68500] bg-[#f0a514]/10 px-2.5 py-1 rounded-md">
                  <div className="h-2 w-2 rounded-full bg-[#f0a514]" />
                  1 warning
                </div>
              </div>
            </div>
            <button type="button" className="mt-1 text-sm font-medium text-[#11ab9e] sm:text-base">
              View all devices
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 mt-4">
            {/* Card 1: Front Door Lock */}
            <div className="group relative rounded-2xl p-[1.5px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#f0a514]/25">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f0a514] via-[#ffc857] to-[#ff8c42] opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#f0a514] via-[#ffc857] to-[#ff8c42] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              <Card className="relative h-full rounded-[14.5px] border-0 bg-gradient-to-br from-[#fffcf8] to-[#fff8ea] shadow-none py-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                <CardContent className="relative flex flex-col justify-between p-5 h-full z-10">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#fcebb0] to-[#f7d774] text-[#d18400] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <LockKeyhole className="h-6 w-6 drop-shadow-sm" />
                      </div>
                      <Badge className="h-7 rounded-full border border-[#f0a514]/20 bg-[#fff5de]/80 px-3 text-xs font-bold text-[#f0a514] shadow-sm backdrop-blur-sm transition-colors group-hover:bg-[#f0a514] group-hover:text-white">
                        <div className="flex items-center gap-1.5 focus:outline-none">
                          <BatteryIcon />
                          12%
                        </div>
                      </Badge>
                    </div>
                    <h4 className="text-lg font-bold tracking-tight text-[#1a2942] transition-colors group-hover:text-[#d18400]">Front Door Lock</h4>
                    <p className="mt-1 text-sm font-medium text-[#7a8c9e]">Oceanview Oasis</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Card 2: Thermostat */}
            <div className="group relative rounded-2xl p-[1.5px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#f05d61]/25">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f05d61] via-[#ff8a8a] to-[#ff4757] opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#f05d61] via-[#ff8a8a] to-[#ff4757] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              <Card className="relative h-full rounded-[14.5px] border-0 bg-gradient-to-br from-[#fffafb] to-[#fff4f5] shadow-none py-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                <CardContent className="relative flex flex-col justify-between p-5 h-full z-10">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffe0e2] to-[#ffb3b8] text-[#e03137] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <Thermometer className="h-6 w-6 drop-shadow-sm" />
                      </div>
                      <Badge className="h-7 rounded-full border border-[#f05d61]/20 bg-[#ffeff0]/80 px-3 text-xs font-bold text-[#f05d61] shadow-sm backdrop-blur-sm transition-colors group-hover:bg-[#f05d61] group-hover:text-white">
                        <div className="flex items-center gap-1.5 focus:outline-none">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                          </span>
                          Offline
                        </div>
                      </Badge>
                    </div>
                    <h4 className="text-lg font-bold tracking-tight text-[#1a2942] transition-colors group-hover:text-[#e03137]">Thermostat</h4>
                    <p className="mt-1 text-sm font-medium text-[#7a8c9e]">Mountain Retreat</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Card 3: Backyard Camera */}
            <div className="group relative rounded-2xl p-[1.5px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#e03137]/25">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff6b6b] via-[#ee5253] to-[#c23616] opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#ff6b6b] via-[#ee5253] to-[#c23616] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              <Card className="relative h-full rounded-[14.5px] border-0 bg-gradient-to-br from-[#fffafb] to-[#fff4f5] shadow-none py-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                <CardContent className="relative flex flex-col justify-between p-5 h-full z-10">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffe0e2] to-[#ffb3b8] text-[#e03137] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <Camera className="h-6 w-6 drop-shadow-sm" />
                      </div>
                      <Badge className="h-7 rounded-full border border-[#f05d61]/20 bg-[#ffeff0]/80 px-3 text-xs font-bold text-[#f05d61] shadow-sm backdrop-blur-sm transition-colors group-hover:bg-[#f05d61] group-hover:text-white">
                        <div className="flex items-center gap-1.5 focus:outline-none">
                          <BatteryIcon />
                          8%
                        </div>
                      </Badge>
                    </div>
                    <h4 className="text-lg font-bold tracking-tight text-[#1a2942] transition-colors group-hover:text-[#e03137]">Backyard Camera</h4>
                    <p className="mt-1 text-sm font-medium text-[#7a8c9e]">Urban Loft</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="gap-0 rounded-2xl border border-[#e7ecf4] bg-white py-0 shadow-none">
          <CardContent className="space-y-3 p-4">
            <Calendar className="h-4 w-4 text-[#14b7ab]" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#637893]">Check-ins</p>
              <p className="text-xl font-bold text-[#0f1f3d]">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 rounded-2xl border border-[#e7ecf4] bg-white py-0 shadow-none">
          <CardContent className="space-y-3 p-4">
            <CheckCircle2 className="h-4 w-4 text-[#3ed4a5]" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#637893]">Tasks</p>
              <p className="text-xl font-bold text-[#0f1f3d]">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 rounded-2xl border border-[#e7ecf4] bg-white py-0 shadow-none">
          <CardContent className="space-y-3 p-4">
            <Clock3 className="h-4 w-4 text-[#f0ab00]" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#637893]">Approvals</p>
              <p className="text-xl font-bold text-[#0f1f3d]">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 rounded-2xl border border-[#e7ecf4] bg-white py-0 shadow-none">
          <CardContent className="space-y-3 p-4">
            <AlertTriangle className="h-4 w-4 text-[#ff7c8c]" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#637893]">Risks</p>
              <p className="text-xl font-bold text-[#0f1f3d]">2</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.95fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex size-7 items-center justify-center rounded-full bg-[#14b7ab]/10 text-[#14b7ab]">
              <Calendar className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-lg font-semibold text-[#071739]">Next Check-ins</h2>
            <span className="text-sm font-medium text-[#6a7f99]">(48h)</span>
          </div>

          <div className="space-y-4">
            <Card className="rounded-2xl border border-[#f0cf8a] bg-white shadow-none py-0">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <ListingThumb
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=280&q=80"
                    alt="Oceanview Oasis"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="rounded-full border border-[#d0d9e6] bg-[#eaf0f7] px-3 py-0.5 text-xs text-[#8999ad]">
                        airbnb
                      </Badge>
                      <div className="flex items-center gap-2 text-[#e8a100]">
                        <Clock3 className="h-4 w-4" />
                        <span className="text-sm font-semibold sm:text-base">3h 49m</span>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-[#10213f]">Oceanview Oasis</h3>
                    <div className="flex min-w-0 items-center gap-1.5 text-xs text-[#6a7f99] sm:text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="break-words">417 Bayview Dr, Malibu, CA 90265</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm" className="h-6 w-6">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah M." />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[#1f2d43] font-medium sm:text-sm">Sarah M. • 3:46 AM</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#7b8da5]">
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium sm:text-sm">4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-[#e7ecf4] bg-white shadow-none py-0">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <ListingThumb
                    src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=280&q=80"
                    alt="Urban Loft"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="rounded-full border border-[#d0d9e6] bg-[#eaf0f7] px-3 py-0.5 text-xs text-[#8999ad]">
                        guesty
                      </Badge>
                      <div className="flex items-center gap-2 text-[#11b3a5]">
                        <Clock3 className="h-4 w-4" />
                        <span className="text-sm font-semibold sm:text-base">1d 1h</span>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-[#10213f]">Urban Loft</h3>
                    <div className="flex min-w-0 items-center gap-1.5 text-xs text-[#6a7f99] sm:text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="break-words">1250 Market St, Unit 4B, San Francisco, CA 94102</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm" className="h-6 w-6">
                          <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" alt="Emily R." />
                          <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[#1f2d43] font-medium sm:text-sm">Emily R. • 1:46 AM</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#7b8da5]">
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium sm:text-sm">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex size-7 items-center justify-center rounded-full bg-[#f0ab00]/10 text-[#f0ab00]">
              <Clock3 className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-lg font-semibold text-[#071739]">Pending Approvals</h2>
          </div>
          <ApprovalCard
            image="https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80"
            title="Mountain Retreat"
            leftTag="Maintenance"
            rightTag="Medium"
            score="82%"
            request="HVAC filter replacement"
            summary="Air filter needs replacement - guest reported poor air quality"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.95fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="inline-flex size-7 items-center justify-center rounded-full bg-[#2ec99d]/10 text-[#2ec99d]">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-lg font-semibold text-[#071739]">Must Do Today</h2>
            </div>
            <button type="button" className="text-sm font-medium text-[#11ab9e] sm:text-base">
              View all
            </button>
          </div>

          <div className="space-y-4">
            <Card className="rounded-2xl border border-[#e7ecf4] bg-white shadow-none py-0">
              <CardContent className="p-4">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
                  <div className="flex w-full gap-3 sm:gap-4">
                    <ListingThumb
                      src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=280&q=80"
                      alt="Oceanview Oasis"
                    />
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="rounded-full border border-[#bfd4ff] bg-[#eaf1ff] px-3 py-0.5 text-xs font-semibold text-[#7da7ff]">
                          Scheduled
                        </Badge>
                        <Badge className="rounded-full border border-[#f8cdb7] bg-[#ffe8dd] px-3 py-0.5 text-xs font-semibold text-[#f39b5b]">
                          High
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold text-[#10213f]">Pre-arrival deep clean</h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#6a7f99] sm:text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Oceanview Oasis</span>
                      </div>
                      <p className="text-xs font-medium text-[#667b95] sm:text-sm">Mar 4 • 1:46 AM - 3:46 AM</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-4 pt-1 lg:w-auto lg:flex-col lg:items-end">
                    <div className="flex items-center gap-1.5 text-[#6f8198]">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold sm:text-sm">1h 49m</span>
                    </div>
                    <Button variant="secondary" className="h-10 rounded-xl bg-[#eef2f7] px-5 text-sm text-[#21314a] sm:h-11 sm:px-6 sm:text-base">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-[#e7ecf4] bg-white shadow-none py-0">
              <CardContent className="p-4">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
                  <div className="flex w-full gap-3 sm:gap-4">
                    <ListingThumb
                      src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=280&q=80"
                      alt="Oceanview Oasis"
                    />
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="rounded-full border border-[#f2ce8f] bg-[#fff3de] px-3 py-0.5 text-xs font-semibold text-[#f2b316]">
                          In Progress
                        </Badge>
                        <Badge className="rounded-full border border-[#d0d9e6] bg-[#eaf0f7] px-3 py-0.5 text-xs font-semibold text-[#8ea0b6]">
                          Low
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold text-[#10213f]">Broken coffee maker</h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#6a7f99] sm:text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Oceanview Oasis</span>
                      </div>
                      <p className="text-xs font-medium text-[#667b95] sm:text-sm">No window set</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-4 pt-1 lg:w-auto lg:flex-col lg:items-end">
                    <div className="flex items-center gap-1.5 text-[#6f8198]">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold sm:text-sm">2h 49m</span>
                    </div>
                    <Button variant="secondary" className="h-10 rounded-xl bg-[#eef2f7] px-5 text-sm text-[#21314a] sm:h-11 sm:px-6 sm:text-base">
                      Track
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-[#e7ecf4] bg-white shadow-none py-0">
              <CardContent className="p-4">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
                  <div className="flex w-full gap-3 sm:gap-4">
                    <ListingThumb
                      src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=280&q=80"
                      alt="Urban Loft"
                    />
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="rounded-full border border-[#f2ce8f] bg-[#fff3de] px-3 py-0.5 text-xs font-semibold text-[#f2b316]">
                          Dispatching
                        </Badge>
                        <Badge className="rounded-full border border-[#f8cdb7] bg-[#ffe8dd] px-3 py-0.5 text-xs font-semibold text-[#f39b5b]">
                          High
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold text-[#10213f]">Turnover cleaning</h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#6a7f99] sm:text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Urban Loft</span>
                      </div>
                      <p className="text-xs font-medium text-[#667b95] sm:text-sm">Mar 4 • 11:46 PM - 1:46 AM</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-4 pt-1 lg:w-auto lg:flex-col lg:items-end">
                    <div className="flex items-center gap-1.5 text-[#6f8198]">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold sm:text-sm">23h 49m</span>
                    </div>
                    <Button className="h-10 rounded-xl bg-[#18b9ab] px-5 text-sm text-white hover:bg-[#16a99c] sm:h-11 sm:px-6 sm:text-base">
                      Dispatch
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4 pt-0 lg:pt-10 xl:pt-[52px]">
          <ApprovalCard
            image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
            title="Oceanview Oasis"
            leftTag="supplies"
            rightTag="Low"
            score="95%"
            request="Low toilet paper supply"
            summary="Cleaner flagged: only 2 rolls remaining, should have 8+"
          />
        </div>
      </section>
    </div>
  </div>
);

const BatteryIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
    <rect x="1.5" y="4" width="11.5" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="13.5" y="6" width="1.5" height="4" rx="0.5" fill="currentColor" />
    <rect x="3.2" y="5.7" width="5.5" height="4.6" rx="0.8" fill="currentColor" />
  </svg>
);





