package hu.f3fu1m.icalcv0.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table
@Getter
@Setter
public class EntityProperty  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String propertyType;
    private String value;
    @ManyToOne
	@JsonIgnore
    private DxfEntity dxfEntity;

	private EntityProperty() {
    }

    public EntityProperty(String propertyType,String value,DxfEntity dxfEntity) {
        this.propertyType = propertyType;
        this.value = value;
        this.dxfEntity = dxfEntity;
    }

    @Override
    public String toString() {
        return "EntityProperty{id=" + propertyType + ", value='" + value + '\'' +'}';
    }

}
