import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CommonCard({ icon, title, description, footerContent }) {
  return (
    <Card className="group relative flex flex-col gap-4 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden">

      {/* Gradient glow blob in background */}
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

      {/* Top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="p-0 gap-3 relative z-10">
        {/* Icon */}
        {icon && (
          <div className="w-14 h-14 rounded-2xl bg-gray-950 flex items-center justify-center shadow-lg">
            {icon}
          </div>
        )}

        <div className="flex flex-col gap-1">
          {title && (
            <CardTitle className="text-lg font-bold text-gray-900 leading-snug max-w-[220px] truncate">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardFooter className="p-0 mt-auto pt-4 border-t border-gray-100 relative z-10">
        {footerContent}
      </CardFooter>
    </Card>
  );
}

export default CommonCard;