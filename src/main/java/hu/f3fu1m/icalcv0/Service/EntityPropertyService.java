package hu.f3fu1m.icalcv0.Service;

import hu.f3fu1m.icalcv0.Repository.EntityPropertyRepository;
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
