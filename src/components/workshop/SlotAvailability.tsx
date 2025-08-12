import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, CheckCircle } from "lucide-react";

interface SlotAvailabilityProps {
  onContinue: () => void;
  onBack: () => void;
  selectedDate: string;
  selectedTime: string;
}

export const SlotAvailability = ({ onContinue, onBack, selectedDate, selectedTime }: SlotAvailabilityProps) => {
  // Mock data for remaining slots
  const remainingSlots = 12;
  const totalSlots = 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-2xl border-0 animate-slide-up">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
            <CardTitle className="text-xl text-foreground">
              Slot còn trống
            </CardTitle>
            <CardDescription>
              Kiểm tra số lượng chỗ còn lại cho Workshop
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Selected Date & Time */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Thời gian đã chọn</span>
              </div>
              <div className="font-semibold text-foreground">
                {selectedDate} - {selectedTime}
              </div>
            </div>

            {/* Slot Information */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {remainingSlots}
                </div>
                <div className="text-muted-foreground">
                  slot còn trống / {totalSlots} tổng số slot
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(remainingSlots / totalSlots) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Còn chỗ! Bạn có thể đăng ký</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={onContinue}
                className="w-full"
                variant="kfc"
                size="lg"
              >
                Tiếp tục đăng ký
              </Button>
              <Button 
                onClick={onBack}
                variant="ghost"
                className="w-full"
              >
                Quay lại
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};