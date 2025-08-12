import { Button } from "@/components/ui/button";
import kfcFood from "@/assets/kfc-food.jpg";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in text-center space-y-8">
        {/* KFC Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/1434dcd8-ff80-4929-8223-083dab5deee3.png" 
            alt="KFC Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        {/* KFC Food Image */}
        <div className="relative mb-8">
          <img 
            src={kfcFood} 
            alt="KFC Delicious Food" 
            className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Workshop Title */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">KFC Workshop</h1>
          <p className="text-muted-foreground text-lg">
            Đăng ký tham gia Workshop dành cho bé
          </p>
        </div>

        {/* Enter Button */}
        <Button 
          onClick={onLoginSuccess}
          className="w-full"
          variant="kfc"
          size="xl"
        >
          Bắt đầu đăng ký
        </Button>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Điều khoản dịch vụ
            </span>{" "}
            và{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Chính sách bảo mật
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};