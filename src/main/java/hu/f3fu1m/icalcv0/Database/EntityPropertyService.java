package hu.f3fu1m.icalcv0.Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntityPropertyService {

	EntityPropertyRepository entProp;
	
	@Autowired
	public void setEntProp(EntityPropertyRepository entProp) {
		this.entProp = entProp;
	}
	
	
}
