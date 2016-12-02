import javax.jws.WebService;

@WebService
public class calculator {
	public String getResult(String operation, double number1, double number2)
	{
		System.out.println(number1);
		String result = "";
		try{
		//String result = "";
			result = operation;
			
		 if(operation.matches("add")){
		  result = Double.toString(number1 + number2);
		  System.out.println(result);
		 }

		 else if(operation.matches("sub")){
			 result =Double.toString(number1 - number2);
		 }
		 else if(operation.matches("mul")){
			 result = Double.toString(number1 * number2) ;
		 }
		 else if(operation.matches("div"))
			 {
			 if(number2==0)
				 {
				 result="Number can not be divided by 0";
				 }
			 else
				 {
			 result =Double.toString((number1 / number2));
				 }
			 }
		 
		 else{
			 result ="Math Exception";}

		 return result;
		
		}
		catch(Exception e){
			System.out.println(e);
			result = e.toString();
			return result;
		}
		
	}
}

		 
