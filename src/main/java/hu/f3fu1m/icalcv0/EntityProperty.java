package hu.f3fu1m.icalcv0;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class EntityProperty  {
	
	@GeneratedValue
	@Id
	private Long id;
    private String propertyType;
    private String value;
    @ManyToOne
	@JsonIgnore
    private DxfEntity dxfEntity;


    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DxfEntity getDxfEntity() {
		return dxfEntity;
	}

	public void setDxfEntity(DxfEntity dxfEntity) {
		this.dxfEntity = dxfEntity;
	}

	private EntityProperty() {
    }

    public EntityProperty(String propertyType,String value,DxfEntity dxfEntity) {
        this.propertyType = propertyType;
        this.value = value;
        this.dxfEntity = dxfEntity;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "EntityProperty{id=" + propertyType + ", value='" + value + '\'' +'}';
    }

    public void setValue(String value) {
        this.value = value;
    }
}
